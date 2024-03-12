from django.db import models

# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

import secrets
import string


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        password,
        username,
        admin=False,
        outside=False,
        master=False,
    ):
        if not email:
            raise ValueError("User must have an email address")
        if not password and outside:
            alphabet = string.ascii_letters + string.digits + string.punctuation
            password = "".join(
                secrets.choice(alphabet) for _ in range(48)
            )  # 48 should be sufficient to make strong password!
        elif not password:
            raise ValueError("User must have password")
        user_obj = self.model(email=self.normalize_email(email))
        user_obj.set_password(password)
        user_obj.username = username
        user_obj.admin = admin
        user_obj.master = master
        user_obj.outside = outside

        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, email, password, username):
        user = self.create_user(
            email, password=password, username=username, master=False, admin=True
        )
        return user


# User class model should be done one and never changed. If you whant add extend things
# good practise is create seperate model eg. Profile and there add changes
class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=64)
    outside = models.BooleanField(
        default=False
    )  # I consider to use charfield to know from where we had user but did we need it?
    master = models.BooleanField(default=False)  # maser_user
    admin = models.BooleanField(default=False)  # superuser
    active = models.BooleanField(default=True)
    confirmed = models.BooleanField(default=False)
    data_join = models.DateField(auto_now_add=True)

    USERNAME_FIELD = "email"
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_id(self):
        return self.pk

    def get_username(self) -> str:
        return super().get_username()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(slef, app_label):
        return True

    def is_outsider(self):
        return self.outside

    @property
    def is_master(self):
        return self.master

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_staff(self):
        return (self.admin,)

    @property
    def is_active(self):
        return self.active


class Place(models.Model):
    user          = models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)
    place_name    = models.CharField(max_length=32, default=None)
    description   = models.TextField(default=None)
    creation_date = models.DateField(auto_now_add=True)
    found_date    = models.DateField()
    lng           = models.FloatField()
    lat           = models.FloatField()
    type          = models.CharField(max_length=64)
    sortof        = models.CharField(max_length=64)
    period        = models.CharField(max_length=64)
    wiki_link     = models.CharField(max_length=64, default=None,null=True)
    topic_link    = models.CharField(max_length=64, default=None, null=True)
    img           = models.CharField(max_length=256, default=None,null=True)

class Question(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)
    title       = models.CharField(max_length=64, default=None)
    description = models.CharField(max_length=360, default=None)
    done        = models.BooleanField(default=False)
