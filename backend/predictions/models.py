from pathlib import Path

import joblib
import numpy as np
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    BASE_DIR
    / "ai-engine"
    / "artifacts"
    / "linear_regression_model.pkl"
)


_model = None


def load_model():
    global _model

    if _model is None:
        _model = joblib.load(MODEL_PATH)

    return _model


def predict_house_price(data: dict) -> float:
    model = load_model()

    input_df = pd.DataFrame([data])

    prediction_log = model.predict(input_df)

    prediction_price = np.expm1(prediction_log)[0]

    return float(prediction_price)

