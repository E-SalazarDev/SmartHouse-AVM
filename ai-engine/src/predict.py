import joblib
import pandas as pd
import numpy as np

from config import MODEL_PATH


def main():
    model = joblib.load(MODEL_PATH)

    sample_house = pd.DataFrame([
        {
            "Id": 1,
            "MSSubClass": 60,
            "MSZoning": "RL",
            "LotFrontage": 65.0,
            "LotArea": 8450,
            "Street": "Pave",
            "LotShape": "Reg",
            "LandContour": "Lvl",
            "Utilities": "AllPub",
            "LotConfig": "Inside",
            "LandSlope": "Gtl",
            "Neighborhood": "CollgCr",
            "Condition1": "Norm",
            "Condition2": "Norm",
            "BldgType": "1Fam",
            "HouseStyle": "2Story",
            "OverallQual": 7,
            "OverallCond": 5,
            "YearBuilt": 2003,
            "YearRemodAdd": 2003,
            "RoofStyle": "Gable",
            "RoofMatl": "CompShg",
            "Exterior1st": "VinylSd",
            "Exterior2nd": "VinylSd",
            "MasVnrType": "BrkFace",
            "MasVnrArea": 196.0,
            "ExterQual": "Gd",
            "ExterCond": "TA",
            "Foundation": "PConc",
            "BsmtQual": "Gd",
            "BsmtCond": "TA",
            "BsmtExposure": "No",
            "BsmtFinType1": "GLQ",
            "BsmtFinSF1": 706,
            "BsmtFinType2": "Unf",
            "BsmtFinSF2": 0,
            "BsmtUnfSF": 150,
            "TotalBsmtSF": 856,
            "Heating": "GasA",
            "HeatingQC": "Ex",
            "CentralAir": "Y",
            "Electrical": "SBrkr",
            "1stFlrSF": 856,
            "2ndFlrSF": 854,
            "LowQualFinSF": 0,
            "GrLivArea": 1710,
            "BsmtFullBath": 1,
            "BsmtHalfBath": 0,
            "FullBath": 2,
            "HalfBath": 1,
            "BedroomAbvGr": 3,
            "KitchenAbvGr": 1,
            "KitchenQual": "Gd",
            "TotRmsAbvGrd": 8,
            "Functional": "Typ",
            "Fireplaces": 0,
            "FireplaceQu": "No Fireplace",
            "GarageType": "Attchd",
            "GarageYrBlt": 2003.0,
            "GarageFinish": "RFn",
            "GarageCars": 2,
            "GarageArea": 548,
            "GarageQual": "TA",
            "GarageCond": "TA",
            "PavedDrive": "Y",
            "WoodDeckSF": 0,
            "OpenPorchSF": 61,
            "EnclosedPorch": 0,
            "3SsnPorch": 0,
            "ScreenPorch": 0,
            "PoolArea": 0,
            "MiscVal": 0,
            "MoSold": 2,
            "YrSold": 2008,
            "SaleType": "WD",
            "SaleCondition": "Normal"
        }
    ])

    prediction_log = model.predict(sample_house)
    prediction_price = np.expm1(prediction_log)[0]

    print(f"Precio estimado: ${prediction_price:,.2f}")


if __name__ == "__main__":
    main()