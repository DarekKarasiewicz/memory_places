
from rest_framework import serializers
from .models import Subforum, Post, Comment 

class SubforumSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Subforum 
        fields = ('id', 'name', 'description')

class PostSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ('id', 'title', 'content', 'created_at', 'subforum')

class CommentSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Comment 
        fields = ('id', 'content', 'created_at', 'author', 'post')