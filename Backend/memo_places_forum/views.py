from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import CommentSerailizer, SubforumSerailizer,PostSerailizer 
from .models import Comment, Subforum, Post 
from rest_framework.response import Response
from django.http import Http404

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerailizer
    queryset = Comment.objects.all()

class SubforumView(viewsets.ModelViewSet):
    serializer_class = SubforumSerailizer
    queryset = Subforum.objects.all()

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerailizer

    def get_queryset(self):
        return Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        parms = kwargs
        print(parms['pk'])
        subforums = Post.objects.filter(id=parms['pk'])
        serializer = PostSerailizer(subforums, many=True)
        return Response(serializer.data) 

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerailizer

    def get_queryset(self):
        return Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        parms = kwargs
        print(parms['pk'])
        subforums = Post.objects.filter(id=parms['pk'])
        serializer = PostSerailizer(subforums, many=True)
        return Response(serializer.data) 

class SubForumPosts(viewsets.ModelViewSet):
    serializer_class=PostSerailizer

    def get_queryset(self):
        return None 

    def retrieve(self, request, *args, **kwargs):
        parms = kwargs
        print(parms['pk'])
        subforums = Post.objects.filter(subforum=parms['pk'])
        serializer = PostSerailizer(subforums, many=True)
        return Response(serializer.data) 