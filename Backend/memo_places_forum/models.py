from django.db import models
from memo_places.models import User
from django.conf import settings
# Create your models here.
class Subforum(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    #Should be owner of subforum ?
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    subforum = models.ForeignKey(Subforum, on_delete=models.CASCADE,null=True)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)

class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
