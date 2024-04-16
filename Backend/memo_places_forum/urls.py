from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'comment', views.CommentView, 'comment')
router.register(r'subforum', views.SubforumView, 'subforum')
router.register(r'post', views.PostView, 'post')

urlpatterns = [
]

urlpatterns += router.urls