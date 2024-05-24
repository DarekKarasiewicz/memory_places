from rest_framework import serializers
from .models import Place, User, Question, Path, PlaceImage, Change, PathImage
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["pk"] = user.id
        token["username"] = user.username
        token["admin"] = user.admin
        token["master"] = user.master
        token["email"] = user.email

        return token

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "active",
            "confirmed",
        )


class Places_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    type_value = serializers.CharField(source="type.value")
    period_value = serializers.CharField(source="period.value")
    sortof_value = serializers.CharField(source="sortof.value")

    class Meta:
        model = Place
        fields = "__all__" 

class PlaceImage_serializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields= "__all__"
class PathImage_serializer(serializers.ModelSerializer):
    class Meta:
        model = PathImage 
        fields= "__all__"

class Path_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    type_value = serializers.CharField(source="type.value")
    period_value = serializers.CharField(source="period.value")

    class Meta:
        model = Path
        fields = "__all__" 

class Short_Places_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Place
        fields = (
            "id",
            "place_name",
            "creation_date",
            "lng",
            "lat",
            "user",
            "username",
            "sortof",
            "type",
            "period",
        )

class Short_Path_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Place
        fields = (
            "id",
            "path_name",
            "creation_date",
            "coordinates"
            "user",
            "username",
            "sortof",
            "type",
            "period",
        )


class Questions_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "title",
            "user",
            "username",
            "description",
            "done",
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get("user") is None:
            data.pop("username", None)
        return data

class Changes_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Change
        fields = (
            "id",
            "user",
            "username",
            "changes_json",
            "creation_date",
        )