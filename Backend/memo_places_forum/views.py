from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import Comments_Serailizer, Posts_Serailizer, Subforums_Serailizer 
from .models import Comment, Subforum, Post 
from memo_places.models import User 
from rest_framework.response import Response

import re

class CommentView(viewsets.ModelViewSet):
    model = Comment
    serializer_class = Comments_Serailizer 
    
    def get_queryset(self):
        return self.model.objects.all()
    
    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])
        post    = get_object_or_404(Post, id=request.data["post"])

        data = request.data
        new_comment = self.model(
            user        = creator,
            post        = post,
            content     = data["content"],
        )
        new_comment.save()
        
        serializer = self.serializer_class(new_comment)

        return Response(serializer.data) 

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                comment = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(comment, many=False)
                return Response(serializer.data)
            case "user":
                comments = self.model.objects.filter(user=value)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)
            case "content":
                comments = self.model.objects.filter(content=value)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)
            case "post":
                comments = self.model.objects.filter(post=value)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)
            case "like":
                comments = self.model.objects.filter(like=value)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)
            case "dislike":
                comments = self.model.objects.filter(dislike=value)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)

        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        comment_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "user":
                    comment_object.user = data["user"]
                case "content":
                    comment_object.content = data["content"]
                case "like":
                    comment_object.like = data["like"]
                case "dislike":
                    comment_object.dislike = data["dislike"]
                case "created_at":
                    comment_object.created_at = data["created_at"]
                case _:
                    pass

        comment_object.save()

        serializer = self.serializer_class(comment_object)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        comment_object =  self.model.objects.get(id=kwargs["pk"])

        comment_object.delete()
        serializer = self.serializer_class(comment_object)
        return Response(serializer.data)

class SubforumView(viewsets.ModelViewSet):
    model = Subforum
    serializer_class = Subforums_Serailizer 
    
    def get_queryset(self):
        return self.model.objects.all()
    
    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])

        data = request.data
        new_subforum = self.model(
            name        = data["name"],
            description = data["description"], 
            user        = creator
        )
        new_subforum.save()
        
        serializer = self.serializer_class(new_subforum)

        return Response(serializer.data) 

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                subforum = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(subforum, many=False)
                return Response(serializer.data)
            case "user":
                subforums = self.model.objects.filter(user=value)
                serializer = self.serializer_class(subforums, many=True)
                return Response(serializer.data)
            case "name":
                subforum = self.model.objects.filter(name=value)
                serializer = self.serializer_class(subforum, many=False)
                return Response(serializer.data)
            case "description":
                subforums = self.model.objects.filter(subforums=value)
                serializer = self.serializer_class(subforums, many=True)
                return Response(serializer.data)
            case _:
                subforum = None
                return Response({"detail": "Invalid key"})
    
    def update(self, request, *args, **kwargs):
        subforum_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "user":
                    subforum_object.user = data["user"]
                case "name":
                    subforum_object.name = data["name"]
                case "description":
                    subforum_object.description = data["description"]
                case _:
                    pass

        subforum_object.save()

        serializer = self.serializer_class(subforum_object)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        subforum_object =  self.model.objects.get(id=kwargs["pk"])

        subforum_object.delete()
        serializer = self.serializer_class(subforum_object)
        return Response(serializer.data)

class PostView(viewsets.ModelViewSet):
    model = Post 
    serializer_class = Posts_Serailizer 
    
    def get_queryset(self):
        return Post.objects.all()
    
    def create(self, request, *args, **kwargs):
        creator  = get_object_or_404(User, id=request.data["user"])
        subforum = get_object_or_404(Subforum, id=request.data["subforum"])

        data = request.data
        new_post = self.model(
            user        = creator,
            subforum    = subforum,
            title       = data["title"],
            content     = data["content"],
        )
        new_post.save()
        
        serializer = self.serializer_class(new_post)

        return Response(serializer.data) 

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                post = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(post, many=False)
                return Response(serializer.data)
            case "user":
                posts = self.model.objects.filter(user=value)
                serializer = self.serializer_class(posts, many=True)
                return Response(serializer.data)
            case "content":
                posts = self.model.objects.filter(content=value)
                serializer = self.serializer_class(posts, many=True)
                return Response(serializer.data)
            case "post":
                posts = self.model.objects.filter(post=value)
                serializer = self.serializer_class(posts, many=True)
                return Response(serializer.data)
            case "like":
                posts = self.model.objects.filter(like=value)
                serializer = self.serializer_class(posts, many=True)
                return Response(serializer.data)
            case "dislike":
                posts = self.model.objects.filter(dislike=value)
                serializer = self.serializer_class(posts, many=True)
                return Response(serializer.data)

        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        post_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "user":
                    post_object.user = data["user"]
                case "title":
                    post_object.user = data["user"]
                case "content":
                    post_object.content = data["content"]
                case "like":
                    post_object.like = data["like"]
                case "dislike":
                    post_object.dislike = data["dislike"]
                case "created_at":
                    post_object.created_at = data["created_at"]
                case _:
                    pass

        post_object.save()

        serializer = self.serializer_class(post_object)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        post_object =  self.model.objects.get(id=kwargs["pk"])

        post_object.delete()
        serializer = self.serializer_class(post_object)
        return Response(serializer.data)