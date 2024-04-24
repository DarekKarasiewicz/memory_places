from rest_framework import serializers
from .models import Subforum, Post, Comment


class Subforums_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Subforum
        fields = "__all__"


class Posts_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class Comments_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
