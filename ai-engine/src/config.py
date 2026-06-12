from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "processed" / "train_clean.csv"

ARTIFACTS_DIR = BASE_DIR / "artifacts"

MODEL_PATH = ARTIFACTS_DIR / "linear_regression_model.pkl"

TARGET_COLUMN = "SalePrice"

RANDOM_STATE = 42

TEST_SIZE = 0.2