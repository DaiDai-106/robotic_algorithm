import numpy as np


def sample_t(n_samples):
    """每个样本独立抽一个 t ~ U(0, 1)。 用于线性插值
    """
    return np.random.uniform(0, 1, size=(n_samples, 1)).astype(np.float32)
