from rest_framework import serializers
from memo_places.models import Place, User, Questions


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id",
                  "username",
                  "email",
                  "password",
                  "master",
                  "admin",
                  "outside",
                  "active",
                  "confirmed",
                  "data_join"
                )


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
        model = Questions
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