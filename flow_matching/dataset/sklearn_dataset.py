from sklearn.datasets import make_moons
import numpy as np


def make_moons_dataset(n_samples=1000, noise=0.05):
    """
    月牙数据集生成函数， 这里生成1000个点，同时增加一些简单噪声
    """
    x, y = make_moons(n_samples=n_samples, noise=noise)
    return x, y


def make_noise(n_samples=1000):
    """标准正态先验 p0：每个点 ~ N(0, I_2)。"""
    return np.random.normal(0, 1, size=(n_samples, 2)).astype(np.float32)


