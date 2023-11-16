from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'comments', views.CommentView, 'comment')
router.register(r'subforums', views.SubforumView, 'subforum')
router.register(r'posts', views.PostView, 'post')

urlpatterns = [
]

urlpatterns += router.urls