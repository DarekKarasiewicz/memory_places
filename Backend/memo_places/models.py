from django.db import models
from django.contrib.auth.models import User

class Place(models.Model):
      user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)
      title = models.CharField(max_length = 32, default=None)
      description = models.TextField(default=None)
      coordinates= models.CharField(max_length=32, default=None, null=True)
