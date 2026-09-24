from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    ChangePasswordView,
    CurrentUserView,
    CustomTokenObtainPairView,
    LogoutView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    PasswordResetVerifyView,
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
        "change-password/",
        ChangePasswordView.as_view(),
        name="auth-change-password",
    ),
    path(
        "logout/",
        LogoutView.as_view(),
        name="auth-logout",
    ),
    path(
        "password-reset/request/",
        PasswordResetRequestView.as_view(),
        name="auth-password-reset-request",
    ),
    path(
        "password-reset/verify/",
        PasswordResetVerifyView.as_view(),
        name="auth-password-reset-verify",
    ),
    path(
        "password-reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="auth-password-reset-confirm",
    ),
]