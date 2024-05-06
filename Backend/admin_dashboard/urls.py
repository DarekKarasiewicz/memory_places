from django.urls import path
from rest_framework import routers
from . import views
from memo_places import views as memo_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r"places", views.Place_view, "place")
router.register(r"path", views.Path_view, "path")
router.register(
    r"not_verified_places", views.None_Verified_Places_view, "not_verified_places"
)
router.register(r"users", views.User_view, "user")
router.register(r"questions", views.Questions_view, "questions")
router.register(r"changes", views.Changes_view, "changes")
router.register(r"types", views.Types_view, "types")
router.register(r"periods", views.Periods_view, "periods")
router.register(r"sortofs", views.Sortofs_view, "sortofs")
router.register(r"reset_password", memo_views.Reset_password, "reset_password")

urlpatterns = []
urlpatterns += router.urls
