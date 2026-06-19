from django.core.management.base import BaseCommand

from properties.models import Property


class Command(BaseCommand):
    help = "Create demo properties for SmartHouse AVM"

    def handle(self, *args, **options):

        demo_properties = [
            {
                "title": "Casa Moderna grande CollgCr ",
                "description": "Casa familiar de dos niveles basada en el dataset Ames Housing.",
                "cover_image_url": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
                "address": "CollgCr, Ames, Iowa",
                "latitude": "42.034534",
                "longitude": "-93.620369",

                "dataset_id": 1,
                "ms_sub_class": 60,
                "ms_zoning": "RL",
                "lot_frontage": 65.0,
                "lot_area": 8450,
                "neighborhood": "CollgCr",
                "overall_qual": 7,
                "overall_cond": 5,
                "year_built": 2003,
                "year_remod_add": 2003,
                "gr_liv_area": 1710,
                "full_bath": 2,
                "half_bath": 1,
                "bedroom_abv_gr": 3,
                "kitchen_abv_gr": 1,
                "kitchen_qual": "Gd",
                "tot_rms_abv_grd": 8,
                "total_bsmt_sf": 856,
                "bsmt_qual": "Gd",
                "garage_type": "Attchd",
                "garage_cars": 2,
                "garage_area": 548,
                "fireplaces": 0,
                "sale_condition": "Normal",

                "model_input_data": {
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
                },
                "is_active": True,
            }
        ]

        for property_data in demo_properties:
            property_obj, created = Property.objects.get_or_create(
                dataset_id=property_data["dataset_id"],
                title=property_data["title"],
                defaults=property_data
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created property: {property_obj.title}"
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Property already exists: {property_obj.title}"
                    )
                )