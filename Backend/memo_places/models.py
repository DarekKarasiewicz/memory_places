from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
      def create_user(self,
                      email,
                      password,
                      username,
                      full_name,
                      phone,
                      fb_link=None,
                      admin=False,
                      master=False,
                      ):
            if not email:
                  raise ValueError("User must have an email address")
            if not password:
                  raise ValueError("User must have password") 
            user_obj= self.model(
                  email=self.normalize_email(email)
            ) 
            user_obj.set_password(password)
            user_obj.username       = username
            user_obj.full_name      = full_name
            user_obj.phone          = phone
            user_obj.fb_link        = fb_link
            user_obj.admin          = admin
            user_obj.master         = master

            user_obj.save(using=self._db)
            return user_obj

#User class model should be done one and never changed. If you whant add extend things
#good practise is create seperate model eg. Profile and there add changes
class User(AbstractBaseUser):
      email       = models.EmailField(max_length=255, unique=True)
      username    = models.CharField(max_length=64)
      full_name   = models.CharField(max_length=255)
      phone       = models.CharField(max_length=13)
      fb_link     = models.CharField(max_length=240,default=None)
      master      = models.BooleanField(default=False) #maser_user
      admin       = models.BooleanField(default=False) #superuser
      active      = models.BooleanField(default=True) 
      confirmed   = models.BooleanField(default=False)
      data_join   = models.DateField(auto_now_add=True) 

      USERNAME_FIELD = 'email'
      #USERNAME_FIELD and password are required by default
      REQUIRED_FIELDS = ['username', 'phone']
      
      objects=UserManager()

      def __str__(self):
            return self.email
      
      def get_full_name(self):
            return self.full_name
      
      def get_username(self) -> str:
            return super().get_username()

      @property
      def is_master(self):
            return self.master

      @property
      def is_admin(self):
            return self.admin

      @property
      def is_active(self):
            return self.active
class Place(models.Model):
      user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)
      place_name = models.CharField(max_length = 32, default=None)
      description = models.TextField(default=None)
      creation_date = models.DateField(auto_now_add=True)
      found_date = models.DateField()
      lng= models.FloatField()
      lat=models.FloatField()
