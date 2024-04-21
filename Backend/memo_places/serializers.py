from rest_framework import serializers
from .models import Place, User, Question, Path


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
            "verified",
        )

class Path_serailizer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
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
            "lng",
            "lat",
            "user",
            "username",
            "sortof",
            "type",
            "period",
            "img",
        )

class Questions_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

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
        if data.get('user') is None:
            data.pop('username', None)
        return data

class Changes_serializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Question
        fields = (
            "id",
            "user",
            "username", 
            "json", 
            "creation_date",
        )