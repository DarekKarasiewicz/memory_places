from rest_framework import serializers
from .models import Place, User


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "active", "confirmed")


class Places_serailizer(serializers.ModelSerializer):
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
            "sortof",
            "type",
            "period",
        )
