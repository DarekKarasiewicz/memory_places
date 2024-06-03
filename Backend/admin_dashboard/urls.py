from django.urls import path
from rest_framework import routers
from . import views
from memo_places import views as memo_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r"places", views.PlaceView, "place")
router.register(r"path", views.PathView, "path")
router.register(r"not_verified_places", views.NoneVerifiedPlacesView, "not_verified_places")
router.register(r"not_verified_path", views.NoneVerifiedPathView, "not_verified_path")
router.register(r"users", views.UserView, "user")
router.register(r"questions", views.QuestionsView, "questions")
router.register(r"changes", views.ChangesView, "changes")
router.register(r"types", views.TypesView, "types")
router.register(r"periods", views.PeriodsView, "periods")
router.register(r"sortofs", views.SortofsView, "sortofs")
router.register(r"reset_password", memo_views.ResetPassword, "reset_password")

urlpatterns = []
urlpatterns += router.urls
