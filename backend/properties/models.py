from django.db import models


class Property(models.Model):
    # --------------------------------------------------
    # INFORMACIÓN VISIBLE PARA EL USUARIO
    # --------------------------------------------------

    # Título de la propiedad
    title = models.CharField(max_length=150)

    # Descripción comercial de la propiedad
    description = models.TextField(blank=True)

    # Imagen principal de la propiedad
    cover_image_url = models.URLField(blank=True)

    # Dirección textual
    address = models.CharField(max_length=255, blank=True)

    # Latitud para mapa
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    # Longitud para mapa
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    # --------------------------------------------------
    # CAMPOS DEL DATASET / MODELO IA
    # --------------------------------------------------

    # Id
    dataset_id = models.IntegerField(null=True, blank=True)

    # MSSubClass
    # Clase del tipo de construcción
    ms_sub_class = models.IntegerField()

    # MSZoning
    # Tipo de zona general
    ms_zoning = models.CharField(max_length=20)

    # LotFrontage
    # Frente del terreno conectado a la calle
    lot_frontage = models.FloatField(null=True, blank=True)

    # LotArea
    # Área total del terreno
    lot_area = models.IntegerField()

    # Neighborhood
    # Barrio o zona del dataset
    neighborhood = models.CharField(max_length=50)

    # OverallQual
    # Calidad general de materiales y acabados
    overall_qual = models.IntegerField()

    # OverallCond
    # Condición general de la vivienda
    overall_cond = models.IntegerField()

    # YearBuilt
    # Año de construcción
    year_built = models.IntegerField()

    # YearRemodAdd
    # Año de remodelación
    year_remod_add = models.IntegerField()

    # GrLivArea
    # Área habitable sobre nivel del suelo
    gr_liv_area = models.IntegerField()

    # FullBath
    # Baños completos
    full_bath = models.IntegerField()

    # HalfBath
    # Medios baños
    half_bath = models.IntegerField()

    # BedroomAbvGr
    # Habitaciones sobre nivel del suelo
    bedroom_abv_gr = models.IntegerField()

    # KitchenAbvGr
    # Número de cocinas
    kitchen_abv_gr = models.IntegerField()

    # KitchenQual
    # Calidad de cocina
    kitchen_qual = models.CharField(max_length=20)

    # TotRmsAbvGrd
    # Total de habitaciones sin contar baños
    tot_rms_abv_grd = models.IntegerField()

    # TotalBsmtSF
    # Área total del sótano
    total_bsmt_sf = models.IntegerField()

    # BsmtQual
    # Calidad del sótano
    bsmt_qual = models.CharField(max_length=30)

    # GarageType
    # Tipo de garaje
    garage_type = models.CharField(max_length=30)

    # GarageCars
    # Capacidad del garaje en autos
    garage_cars = models.IntegerField()

    # GarageArea
    # Área del garaje
    garage_area = models.IntegerField()

    # Fireplaces
    # Número de chimeneas
    fireplaces = models.IntegerField()

    # SaleCondition
    # Condición de venta
    sale_condition = models.CharField(max_length=30)

    # --------------------------------------------------
    # CONTROL DEL SISTEMA
    # --------------------------------------------------

    # Indica si la propiedad se muestra en el catálogo
    is_active = models.BooleanField(default=True)

    # Fecha de creación del registro
    created_at = models.DateTimeField(auto_now_add=True)

    # Fecha de última actualización
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title