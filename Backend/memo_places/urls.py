from django.urls import path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r"places", views.Place_view, "place")
router.register(r"path", views.Path_view, "path")
router.register(r"short_places", views.Short_place_view, "short_place")
router.register(r"users", views.User_view, "user")
router.register(r"outside_users", views.Outside_user_view, "outside_user")
router.register(r"user_verifi", views.VerificationMail, "user_verifi")
router.register(r"contact_us", views.Contact_us, "contact_us")
router.register(r"reset_password", views.Reset_password, "reset_password")
# router.register(r'token/', views.MyTokenObtainPairView,'token_obtain_pair'),

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
