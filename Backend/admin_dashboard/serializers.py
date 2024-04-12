from rest_framework import serializers
from memo_places.models import Place, User, Question, Type, Sortof, Period


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
class Types_serializer(serializers.ModelSerializer):
    class Meta:
        model =Type
        fields = '__all__'

class Sortof_serializer(serializers.ModelSerializer):
    class Meta:
        model = Sortof
        fields = '__all__'
class Period_serializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = '__all__'