from django.urls import path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'places', views.Place_view, 'place')

urlpatterns = [
]

urlpatterns += router.urls