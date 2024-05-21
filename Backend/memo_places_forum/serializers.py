from rest_framework import serializers
from .models import Post, Comment, UserCommentLike, UserPostLike
class Posts_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class Comments_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class UserPostLike_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = UserPostLike 
        fields = "__all__"

class UserCommentLike_Serailizer(serializers.ModelSerializer):
    class Meta:
        model = UserCommentLike
        fields = "__all__"