from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    CurrentUserView,
    CustomTokenObtainPairView,
    LogoutView,
    UserRegisterView,
)


urlpatterns = [
    path(
        "register/",
        UserRegisterView.as_view(),
        name="auth-register",
    ),
    path(
        "login/",
        CustomTokenObtainPairView.as_view(),
        name="auth-login",
    ),
    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="auth-refresh",
    ),
    path(
        "verify/",
        TokenVerifyView.as_view(),
        name="auth-verify",
    ),
    path(
        "me/",
        CurrentUserView.as_view(),
        name="auth-me",
    ),
    path(
        "logout/",
        LogoutView.as_view(),
        name="auth-logout",
    ),
]