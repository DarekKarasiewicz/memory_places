from rest_framework import serializers
from .models import Place, User


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('username', 'email', 'phone', 'full_name','fb_link',)
class Places_serailizer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'title', 'description', 'coordinates')
