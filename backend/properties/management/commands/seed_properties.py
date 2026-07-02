import json
import math
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from properties.models import Property


def clean_json(value):
    if isinstance(value, float):
        if math.isnan(value) or math.isinf(value):
            return None
        return value

    if isinstance(value, dict):
        return {key: clean_json(val) for key, val in value.items()}

    if isinstance(value, list):
        return [clean_json(item) for item in value]

    return value


def get_quality_category(overall_qual):
    overall_qual = int(overall_qual)

    if overall_qual <= 3:
        return "low"

    if overall_qual <= 6:
        return "medium"

    if overall_qual <= 8:
        return "high"

    return "luxury"


def get_cover_image_url(media_houses_path, category, dataset_id):
    category_path = media_houses_path / category
    images = sorted(category_path.glob("*.jpg"))

    if not images:
        raise FileNotFoundError(f"No hay imágenes en la carpeta: {category_path}")

    image_index = (int(dataset_id) - 1) % len(images)
    image_path = images[image_index]

    return f"/media/houses/{category}/{image_path.name}"


class Command(BaseCommand):
    help = "Carga propiedades desde properties/seeds/properties_seed.json"

    def handle(self, *args, **options):
        json_path = (
            Path(settings.BASE_DIR)
            / "properties"
            / "seeds"
            / "properties_seed.json"
        )

        media_houses_path = Path(settings.BASE_DIR) / "media" / "houses"

        if not json_path.exists():
            self.stdout.write(self.style.ERROR(f"No existe: {json_path}"))
            return

        with open(json_path, "r", encoding="utf-8") as file:
            raw_properties = json.load(file)

        created_count = 0
        updated_count = 0
        error_count = 0

        for item in raw_properties:
            try:
                model_input_data = item.get("model_input_data")

                if model_input_data is None:
                    model_input_data = item.copy()

                if isinstance(model_input_data, str):
                    model_input_data = json.loads(model_input_data)

                model_input_data = clean_json(model_input_data)
                model_input_data.pop("SalePrice", None)

                dataset_id = item.get("dataset_id") or model_input_data.get("Id")

                overall_qual = (
                    item.get("overall_qual")
                    or model_input_data.get("OverallQual")
                    or 5
                )

                category = get_quality_category(overall_qual)

                cover_image_url = get_cover_image_url(
                    media_houses_path=media_houses_path,
                    category=category,
                    dataset_id=dataset_id,
                )

                property_data = {
                    "title": item.get("title"),
                    "description": item.get("description"),
                    "cover_image_url": cover_image_url,
                    "address": item.get("address") or f"{model_input_data.get('Neighborhood', 'Ames')}, Ames, Iowa",
                    "latitude": item.get("latitude") or "42.034534",
                    "longitude": item.get("longitude") or "-93.620369",

                    "dataset_id": dataset_id,
                    "ms_sub_class": item.get("ms_sub_class") or model_input_data.get("MSSubClass"),
                    "ms_zoning": item.get("ms_zoning") or model_input_data.get("MSZoning"),
                    "lot_frontage": item.get("lot_frontage") or model_input_data.get("LotFrontage"),
                    "lot_area": item.get("lot_area") or model_input_data.get("LotArea"),
                    "neighborhood": item.get("neighborhood") or model_input_data.get("Neighborhood"),
                    "overall_qual": overall_qual,
                    "overall_cond": item.get("overall_cond") or model_input_data.get("OverallCond"),
                    "year_built": item.get("year_built") or model_input_data.get("YearBuilt"),
                    "year_remod_add": item.get("year_remod_add") or model_input_data.get("YearRemodAdd"),
                    "gr_liv_area": item.get("gr_liv_area") or model_input_data.get("GrLivArea"),
                    "full_bath": item.get("full_bath") or model_input_data.get("FullBath"),
                    "half_bath": item.get("half_bath") or model_input_data.get("HalfBath"),
                    "bedroom_abv_gr": item.get("bedroom_abv_gr") or model_input_data.get("BedroomAbvGr"),
                    "kitchen_abv_gr": item.get("kitchen_abv_gr") or model_input_data.get("KitchenAbvGr"),
                    "kitchen_qual": item.get("kitchen_qual") or model_input_data.get("KitchenQual"),
                    "tot_rms_abv_grd": item.get("tot_rms_abv_grd") or model_input_data.get("TotRmsAbvGrd"),
                    "total_bsmt_sf": item.get("total_bsmt_sf") or model_input_data.get("TotalBsmtSF"),
                    "bsmt_qual": item.get("bsmt_qual") or model_input_data.get("BsmtQual"),
                    "garage_type": item.get("garage_type") or model_input_data.get("GarageType"),
                    "garage_cars": item.get("garage_cars") or model_input_data.get("GarageCars"),
                    "garage_area": item.get("garage_area") or model_input_data.get("GarageArea"),
                    "fireplaces": item.get("fireplaces") or model_input_data.get("Fireplaces"),
                    "sale_condition": item.get("sale_condition") or model_input_data.get("SaleCondition"),
                    "model_input_data": model_input_data,
                    "is_active": item.get("is_active", True),
                }

                property_obj = (
                    Property.objects
                    .filter(dataset_id=dataset_id)
                    .order_by("id")
                    .first()
                )

                if property_obj:
                    for field, value in property_data.items():
                        setattr(property_obj, field, value)

                    property_obj.save()
                    updated_count += 1
                    self.stdout.write(
                        self.style.WARNING(
                            f"Actualizada: {property_obj.title} -> {cover_image_url}"
                        )
                    )
                else:
                    property_obj = Property.objects.create(**property_data)
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Creada: {property_obj.title} -> {cover_image_url}"
                        )
                    )

            except Exception as error:
                error_count += 1
                self.stdout.write(self.style.ERROR(f"Error: {error}"))

        self.stdout.write("=" * 50)
        self.stdout.write(self.style.SUCCESS(f"Creadas: {created_count}"))
        self.stdout.write(self.style.WARNING(f"Actualizadas: {updated_count}"))
        self.stdout.write(self.style.ERROR(f"Errores: {error_count}"))
        self.stdout.write("=" * 50)