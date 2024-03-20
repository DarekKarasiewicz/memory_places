from django.urls import path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r"places", views.Place_view, "place")
router.register(r"not_verified_places", views.None_Verified_Places_view, "not_verified_places")
router.register(r"users", views.User_view, "user")
router.register(r"outside_users", views.Outside_user_view, "outside_user")
router.register(r"questions", views.Questions_view, "questions")
router.register(r"changes", views.Changes_view, "changes")
# router.register(r'token/', views.MyTokenObtainPairView,'token_obtain_pair'),

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls