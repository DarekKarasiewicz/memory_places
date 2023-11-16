from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CommentSerailizer, SubforumSerailizer,PostSerailizer 
from .models import Comment, Subforum, Post 

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerailizer
    queryset = Comment.objects.all()

class SubforumView(viewsets.ModelViewSet):
    serializer_class = SubforumSerailizer
    queryset = Subforum.objects.all()

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerailizer
    queryset = Post.objects.all()