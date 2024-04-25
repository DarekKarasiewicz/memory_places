from rest_framework import serializers
from .models import Place, User, Question, Path, PlaceImage, Change, PathImage


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
            "sortof_value",
            "type",
            "type_value",
            "period",
            "period_value",
            "topic_link",
            "wiki_link",
            "verified",
        )

    # def get_place_image(self, obj):
    #     images = PlaceImage.objects.filter(place=obj)
    #     return [image.img.url for image in images]

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
        fields = (
            "id",
            "path_name",
            "description",
            "creation_date",
            "found_date",
            "coordinates",
            "user",
            "username",
            "type",
            "type_value",
            "period",
            "period_value",
            "topic_link",
            "wiki_link",
        )

class Short_Places_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Place
        fields = (
            "id",
            "place_name",
            "found_date",
            "lng",
            "lat",
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