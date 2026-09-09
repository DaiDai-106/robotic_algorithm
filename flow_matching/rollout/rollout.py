from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation, PillowWriter


def save_rollout_animation(
    positions,
    velocities,
    times,
    save_path,
    background=None,
    fps=4,
):
    """把 rollout 轨迹存成 gif：每帧画出当前点和速度箭头。

    positions:  (T, N, 2)
    velocities: (T, N, 2)
    times:      (T,)
    background: 可选，月牙点 (M, 2)，画成浅色背景
    """
    save_path = Path(save_path)
    save_path.parent.mkdir(parents=True, exist_ok=True)

    all_xy = [positions.reshape(-1, 2)]
    if background is not None:
        all_xy.append(np.asarray(background)[:, :2])
    pts = np.concatenate(all_xy, axis=0)
    pad = 0.4
    xlim = (pts[:, 0].min() - pad, pts[:, 0].max() + pad)
    ylim = (pts[:, 1].min() - pad, pts[:, 1].max() + pad)

    fig, ax = plt.subplots(figsize=(5, 5))
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal")
    if background is not None:
        bg = np.asarray(background)
        ax.scatter(bg[:, 0], bg[:, 1], s=6, c="lightgray", alpha=0.5, zorder=1)

    scatter = ax.scatter(
        positions[0, :, 0],
        positions[0, :, 1],
        s=22,
        c="C0",
        zorder=3,
    )
    quiver = ax.quiver(
        positions[0, :, 0],
        positions[0, :, 1],
        velocities[0, :, 0],
        velocities[0, :, 1],
        angles="xy",
        scale_units="xy",
        scale=8,
        width=0.006,
        color="C1",
        zorder=4,
    )
    title = ax.set_title("")

    def update(frame):
        xy = positions[frame]
        v = velocities[frame]
        scatter.set_offsets(xy)
        quiver.set_offsets(xy)
        quiver.set_UVC(v[:, 0], v[:, 1])
        title.set_text(f"t = {times[frame]:.2f}  (step {frame}/{len(times) - 1})")
        return scatter, quiver, title

    anim = FuncAnimation(
        fig,
        update,
        frames=len(times),
        interval=1000 / fps,
        blit=False,
    )
    anim.save(save_path, writer=PillowWriter(fps=fps))
    plt.close(fig)
    return save_path
