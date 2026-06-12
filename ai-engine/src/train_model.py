import joblib
import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from config import (
    DATA_PATH,
    MODEL_PATH,
    ARTIFACTS_DIR,
    TARGET_COLUMN,
    RANDOM_STATE,
    TEST_SIZE,
)


def main():
    df = pd.read_csv(DATA_PATH)

    y = np.log1p(df[TARGET_COLUMN])
    X = df.drop(columns=[TARGET_COLUMN])

    categorical_features = X.select_dtypes(include=["object"]).columns
    numeric_features = X.select_dtypes(exclude=["object"]).columns

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore"),
                categorical_features,
            ),
            (
                "numeric",
                "passthrough",
                numeric_features,
            ),
        ]
    )

    model_pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", LinearRegression()),
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
    )

    model_pipeline.fit(X_train, y_train)

    y_pred_log = model_pipeline.predict(X_test)

    y_test_real = np.expm1(y_test)
    y_pred_real = np.expm1(y_pred_log)

    mae = mean_absolute_error(y_test_real, y_pred_real)
    rmse = np.sqrt(mean_squared_error(y_test_real, y_pred_real))
    r2 = r2_score(y_test_real, y_pred_real)

    print(f"MAE  : {mae:,.2f}")
    print(f"RMSE : {rmse:,.2f}")
    print(f"R²   : {r2:.4f}")

    ARTIFACTS_DIR.mkdir(exist_ok=True)

    joblib.dump(model_pipeline, MODEL_PATH)

    print(f"Modelo guardado en: {MODEL_PATH}")


if __name__ == "__main__":
    main()