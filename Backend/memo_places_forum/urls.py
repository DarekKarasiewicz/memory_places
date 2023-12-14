from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'comments', views.CommentView, 'comment')
router.register(r'subforums', views.SubforumView, 'subforum')
router.register(r'posts', views.PostView, 'post')
router.register(r'forum_posts', views.SubForumPosts, 'forum_post')
# router.register(r'subforum_posts', views.SubForumPosts, basename='subforum_posts')

urlpatterns = [
]

urlpatterns += router.urls