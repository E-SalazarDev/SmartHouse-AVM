from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predictions/', include("predictions.urls")),
    path("api/properties/", include("properties.urls")),
]
