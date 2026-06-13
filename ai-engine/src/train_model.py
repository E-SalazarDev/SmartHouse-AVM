import argparse
import logging
from pathlib import Path

import joblib
import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd
import yaml

from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from mlflow.tracking import MlflowClient

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Train SmartHouse-AVM model"
    )

    parser.add_argument(
        "--config",
        type=str,
        default="config/model_config.yaml",
        help="Path to model config file"
    )

    return parser.parse_args()


def load_config(config_path):
    with open(config_path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)  # Convierte mi archivo .yaml a dic de python


def build_model_pipeline(X):
    
    categorical_features = X.select_dtypes(
        include=["object"]
    ).columns

    numeric_features = X.select_dtypes(
        exclude=["object"]
    ).columns

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore"),
                categorical_features
            ),
            (
                "numeric",
                "passthrough",
                numeric_features
            )
        ]
    )

    model_pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", LinearRegression())
        ]
    )

    return model_pipeline


def evaluate_model(y_test_real, y_pred_real):
    mae = mean_absolute_error(
        y_test_real,
        y_pred_real
    )

    rmse = np.sqrt(
        mean_squared_error(
            y_test_real,
            y_pred_real
        )
    )

    r2 = r2_score(
        y_test_real,
        y_pred_real
    )

    return mae, rmse, r2


def main():
    args = parse_args()
    config = load_config(args.config)

    base_dir = Path(__file__).resolve().parent.parent

    data_path = base_dir / config["data"]["processed_path"]
    model_path = base_dir / config["artifacts"]["model_path"]

    target = config["model"]["target"]

    logger.info("Loading dataset...")
    df = pd.read_csv(data_path)

    X = df.drop(columns=[target])
    y = np.log1p(df[target])

    logger.info("Building model pipeline...")
    model_pipeline = build_model_pipeline(X)

    logger.info("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=config["training"]["test_size"],
        random_state=config["training"]["random_state"]
    )

    logger.info("Training model...")
    model_pipeline.fit(
        X_train,
        y_train
    )

    logger.info("Generating predictions...")
    y_pred_log = model_pipeline.predict(X_test)

    y_test_real = np.expm1(y_test)
    y_pred_real = np.expm1(y_pred_log)

    mae, rmse, r2 = evaluate_model(
        y_test_real,
        y_pred_real
    )

    logger.info(f"MAE  : {mae:,.2f}")
    logger.info(f"RMSE : {rmse:,.2f}")
    logger.info(f"R²   : {r2:.4f}")

    mlflow.set_tracking_uri(
        config["experiment"]["tracking_uri"]
    )

    mlflow.set_experiment(
        config["experiment"]["name"]
    )

    with mlflow.start_run(
        run_name=config["experiment"]["run_name"]
    ):
        mlflow.log_param(
            "model_type",
            config["model"]["type"]
        )

        mlflow.log_param(
            "target_transform",
            config["model"]["target_transform"]
        )

        mlflow.log_param(
            "test_size",
            config["training"]["test_size"]
        )

        mlflow.log_param(
            "random_state",
            config["training"]["random_state"]
        )

        mlflow.log_metric("mae", mae)
        mlflow.log_metric("rmse", rmse)
        mlflow.log_metric("r2", r2)

        mlflow.sklearn.log_model(
            sk_model=model_pipeline,
            name="model"
        )
        
        run_id = mlflow.active_run().info.run_id
        
        model_name = config["model"]["name"]
        
        model_uri = f"runs:/{run_id}/model"
        
        client = MlflowClient()
        
        try:
            client.create_registered_model(model_name)
        except Exception:
            logger.info("Registered model already exists.")
        
        model_version = client.create_model_version(name= model_name, source= model_uri, run_id=run_id)
        client.set_registered_model_alias(model_name, "staging", model_version.version)
        logger.info(f"Registered model version: {model_version.version}")
               

    logger.info("Saving model locally...")
    model_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        model_pipeline,
        model_path
    )

    logger.info(f"Model saved at: {model_path}")


if __name__ == "__main__":
    main()