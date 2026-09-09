import matplotlib.pyplot as plt


def moon_visualizer(x, y, title="Two Moons"):
    """
    月牙数据集可视化：把每个点画在平面上，颜色区分两条月牙。
    """
    plt.figure(figsize=(5, 5))
    plt.scatter(x[:, 0], x[:, 1], c=y, cmap="coolwarm", s=8, alpha=0.8)
    plt.title(title)
    plt.axis("equal")
    plt.tight_layout()
    plt.show()


def noise_visualizer(x, title="Noise"):
    """
    噪声分布可视化：把每个点画在平面上，颜色为黑色
    """
    plt.figure(figsize=(5, 5))
    plt.scatter(x[:, 0], x[:, 1], c="black", s=8, alpha=0.8)
    plt.title(title)
    plt.axis("equal")
    plt.tight_layout()
    plt.show()


def loss_visualizer(losses, title="Training Loss"):
    """画出训练过程中 loss 随 step 下降的曲线。"""
    plt.figure(figsize=(6, 4))
    plt.plot(losses)
    plt.xlabel("step")
    plt.ylabel("loss")
    plt.title(title)
    plt.tight_layout()
    plt.show()
