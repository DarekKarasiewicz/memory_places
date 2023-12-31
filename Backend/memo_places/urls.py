from django.urls import path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'places', views.Place_view, 'place')
router.register(r'users', views.User_view, 'user')
# router.register(r'token/', views.MyTokenObtainPairView,'token_obtain_pair'),

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls