from django.urls import path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r"places", views.PlaceView, "place")
router.register(r"path", views.PathView, "path")
router.register(r"short_places", views.ShortPlaceView, "short_place")
router.register(r"short_path", views.ShortPathView, "short_path")
router.register(r"users", views.UserView, "user")
router.register(r"outside_users", views.OutsideUserView, "outside_user")
router.register(r"user_verifi", views.VerificationMail, "user_verifi")
router.register(r"contact_us", views.ContactUs, "contact_us")
router.register(r"reset_password", views.ResetPassword, "reset_password")
router.register(r"types", views.TypesView, "types")
router.register(r"sortofs", views.SortofsView, "sortofs")
router.register(r"periods", views.PeriodsView, "periods")
router.register(r"changes", views.Changes, "changes")
router.register(r"place_image", views.PlaceImageView, "placeimage_place")
router.register(r"path_image", views.PathImageView, "pathimage_place")

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
