from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Subforum(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    # Add other subreddit-related fields as needed

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    subforum = models.ForeignKey(Subforum, on_delete=models.CASCADE,null=True)
    like = models.IntegerField(null=True)
    dislike = models.IntegerField(null=True)
    # Add other post-related fields as needed

class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    like = models.IntegerField(null=True)
    dislike = models.IntegerField(null=True)
    # Add other comment-related fields as needed
