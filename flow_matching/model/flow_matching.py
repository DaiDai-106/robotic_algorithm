import numpy as np
import torch
import torch.nn as nn

from flow_matching.utils.utils import sample_t


class VelocityNet(nn.Module):
    """输入 (xt, t)，输出预测速度，形状和 xt 一样。"""

    def __init__(self, hidden=64):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(3, hidden),
            nn.SiLU(),
            nn.Linear(hidden, hidden),
            nn.SiLU(),
            nn.Linear(hidden, 2),
        )

    def forward(self, xt, t):
        return self.net(torch.cat([xt, t], dim=-1))


class FlowMatching:
    """
    直线路径的无条件 Flow Matching：两端分布 + 构造 batch + 速度网络 + 训练。
    - x0: t=0 的噪声，形状 (N, 2)
    - x1: t=1 的月牙点，形状 (N, 2)
    """

    def __init__(self, x0, x1):
        self.x0 = x0  # 噪声分布
        self.x1 = x1  # 目标分布
        self.net = VelocityNet()

    def make_batch(self, batch_size):
        """随机抽一批 (xt, t, u)，u 是直线路径上的目标速度 x1 - x0。"""
        idx0 = np.random.randint(0, len(self.x0), size=batch_size)
        idx1 = np.random.randint(0, len(self.x1), size=batch_size)

        x0 = np.asarray(self.x0[idx0], dtype=np.float32)
        x1 = np.asarray(self.x1[idx1], dtype=np.float32)
        t = sample_t(batch_size)

        xt = (1.0 - t) * x0 + t * x1
        u = x1 - x0
        return xt, t, u

    def predict_velocity(self, xt, t):
        """根据当前位置和时间，预测速度。xt/t 可以是 numpy。"""
        xt = torch.as_tensor(xt, dtype=torch.float32)
        t = torch.as_tensor(t, dtype=torch.float32)
        return self.net(xt, t)

    def compute_loss(self, xt, t, u):
        """预测速度和目标速度的均方误差。"""
        v_hat = self.predict_velocity(xt, t)
        u = torch.as_tensor(u, dtype=torch.float32)
        return torch.mean((v_hat - u) ** 2)

    def train(self, steps=5000, batch_size=256, lr=1e-3, log_every=500):
        """每个 step：抽 batch → 算 loss → 反向传播 → 更新网络。

        返回每个 step 的 loss，用来画下降曲线。
        """
        optimizer = torch.optim.Adam(self.net.parameters(), lr=lr)
        self.net.train()
        losses = []
        for step in range(steps):
            xt, t, u = self.make_batch(batch_size)
            loss = self.compute_loss(xt, t, u)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            losses.append(loss.item())
            if step % log_every == 0 or step == steps - 1:
                print(f"step {step:5d}  loss {loss.item():.4f}")
        return losses

    def rollout(self, x0, n_steps=10):
        """从噪声出发，用欧拉法走 n_steps 步到 t=1。

        连续时间 ODE:
            dx/dt = v_theta(x, t),  t 从 0 走到 1,  x(0) = x0

        欧拉离散 (dt = 1 / n_steps):
            x_{k+1} = x_k + dt * v_theta(x_k, t_k),  t_k = k * dt

        每一步（含起点和终点）记录位置和速度方向。
        返回:
            positions:  (n_steps + 1, N, 2)
            velocities: (n_steps + 1, N, 2)
            times:      (n_steps + 1,)
        """
        self.net.eval()
        x = torch.as_tensor(np.asarray(x0, dtype=np.float32))
        n = x.shape[0]
        dt = 1.0 / n_steps
        positions = []
        velocities = []
        times = []
        with torch.no_grad():
            for i in range(n_steps + 1):
                t_val = i * dt
                t = torch.full((n, 1), t_val)
                v = self.net(x, t)
                positions.append(x.detach().cpu().numpy().copy())
                velocities.append(v.detach().cpu().numpy().copy())
                times.append(t_val)
                if i < n_steps:
                    # x_{k+1} = x_k + dt * v_theta(x_k, t_k)
                    x = x + dt * v
        return np.stack(positions), np.stack(velocities), np.asarray(times, dtype=np.float32)



