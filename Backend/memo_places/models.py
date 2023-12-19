from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser 
class Place(models.Model):
      user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)
      place_name = models.CharField(max_length = 32, default=None)
      description = models.TextField(default=None)
      creation_date = models.DateField(auto_now_add=True)
      found_date = models.DateField()
      lng= models.FloatField()
      lat=models.FloatField()
