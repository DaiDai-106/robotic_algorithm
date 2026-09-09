from flow_matching.dataset.sklearn_dataset import make_moons_dataset, make_noise
from flow_matching.model.flow_matching import FlowMatching
from flow_matching.rollout.rollout import save_rollout_animation
from flow_matching.utils.dataset_viewer import (
    loss_visualizer,
    moon_visualizer,
    noise_visualizer,
)

# 训练超参数：改这里即可
N_SAMPLES = 1000
STEPS = 5000
BATCH_SIZE = 256
LR = 1e-3
LOG_EVERY = 50

# rollout：200 个噪声点，10 步走到月牙
N_ROLLOUT = 200
N_ROLLOUT_STEPS = 10
ROLLOUT_GIF = "flow_matching/rollout/moons_rollout.gif"


def main():
    # 1. 生成目标 distribution（只要点坐标，标签先不用）
    x1, y = make_moons_dataset(n_samples=N_SAMPLES, noise=0.05)

    # 2. 生成噪声 distribution
    x0 = make_noise(n_samples=N_SAMPLES)

    # 3. 可视化两端分布
    # moon_visualizer(x1, y)
    # noise_visualizer(x0)

    # 4. 初始化并训练：让网络预测的速度去贴 u = x1 - x0
    model = FlowMatching(x0=x0, x1=x1)
    losses = model.train(steps=STEPS, batch_size=BATCH_SIZE, lr=LR, log_every=LOG_EVERY)

    # 5. 画出 loss 下降曲线
    # loss_visualizer(losses)

    # 6. 从新噪声 rollout，记录每步位置和速度方向，存成动画
    x_start = make_noise(n_samples=N_ROLLOUT)
    positions, velocities, times = model.rollout(x_start, n_steps=N_ROLLOUT_STEPS)
    gif_path = save_rollout_animation(
        positions,
        velocities,
        times,
        save_path=ROLLOUT_GIF,
        background=x1,
    )
    print(f"rollout 动画已保存: {gif_path}")


if __name__ == "__main__":
    main()