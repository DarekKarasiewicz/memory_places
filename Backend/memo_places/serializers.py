from rest_framework import serializers
from .models import Place, User


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "active", "confirmed")


class Places_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = Place
        fields = (
            "id",
            "place_name",
            "description",
            "creation_date",
            "found_date",
            "lng",
            "lat",
            "user",
            "username",
            "sortof",
            "type",
            "period",
            "topic_link",
            "wiki_link",
            "img",
        )
class Short_Places_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = Place
        fields = (
            "id",
            "place_name",
            "creation_date",
            "found_date",
            "user",
            "username",
            "sortof",
            "type",
            "period",
            "img",
        )

