from rest_framework import serializers
from .models import Subforum, Post, Comment 

class SubforumSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Subforum 
        fields = ('id', 'name', 'description')

class PostSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields ='__all__'

class CommentSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Comment 
        fields = ('id', 'content', 'created_at', 'author', 'post')