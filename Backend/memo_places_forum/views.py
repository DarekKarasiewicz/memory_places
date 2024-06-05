from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import Comments_Serailizer, Posts_Serailizer, UserPostLike_Serailizer, UserCommentLike_Serailizer
from .models import Comment, Post, UserCommentLike, UserPostLike
from memo_places.models import User, Type, Period, Place
from rest_framework.response import Response

import re


class CommentView(viewsets.ModelViewSet):
    model = Comment
    serializer_class = Comments_Serailizer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        creator = get_object_or_404(User, id=data["user"])
        post = get_object_or_404(Post, id=data["post"])

        new_comment = self.model(
            user=creator,
            post=post,
            content=data["content"],
        )
        new_comment.save()

        serializer = self.serializer_class(new_comment)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match(r"(\w+)=(.+)", kwargs["pk"]).groups()
        page = int(request.query_params.get("page", 1))
        page_size = 15
        start = (page - 1) * page_size
        end = start + page_size

        sort_key = request.query_params.get("sort", None)
        order = '-' if 'desc_' in kwargs["pk"] else ''

        if 'asc_' in kwargs["pk"]:
            order = ''
        elif 'desc_' in kwargs["pk"]:
            order = '-'

        sort_order = f"{order}{sort_key}" if sort_key else None

        match key:
            case "pk":
                comment = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(comment, many=False)
                return Response(serializer.data)
            case "user":
                comments = self.model.objects.filter(user=value)
            case "post":
                comments = self.model.objects.filter(post=value)
            case _:
                return Response({"error": "Invalid request"}, status=400)

        if sort_order:
            comments = comments.order_by(sort_order)

        comments = comments[start:end]
        serializer = self.serializer_class(comments, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        comment_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "content":
                    comment_object.content = data["content"]
                case "like":
                    user = get_object_or_404(User, id=data["user"])
                    if UserCommentLike.objects.filter(user=user, comment=comment_object).exists():
                        return Response({'error': 'User already liked this comment'}, status=404)                    
                    UserCommentLike(
                        user = user,
                        comment = comment_object
                    ).save()
                    comment_object.like = comment_object.like + 1 
                case "dislike":
                    user = get_object_or_404(User, id=data["user"])
                    if UserCommentLike.objects.filter(user=user, comment=comment_object).exists():
                        UserCommentLike.objects.filter(user=user, comment=comment_object).delete()
                        comment_object.like = comment_object.like - 1
                    else:
                        return Response({'error': "User don't liked this comment"}, status=404)                    
                case _:
                    pass

        comment_object.save()

        serializer = self.serializer_class(comment_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        comment_object = self.model.objects.get(id=kwargs["pk"])

        comment_object.delete()
        serializer = self.serializer_class(comment_object)
        return Response(serializer.data)

class PostView(viewsets.ModelViewSet):
    model = Post
    serializer_class = Posts_Serailizer

    def get_queryset(self):
        return Post.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        creator = get_object_or_404(User, id=data["user"])
        place = get_object_or_404(Place, id=data["place"])

        new_post = self.model(
            user=creator,
            title=data["title"],
            content=data["content"],
            place = place,
        )
        new_post.save()

        serializer = self.serializer_class(new_post)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match(r"(\w+)=(.+)", kwargs["pk"]).groups()
        keys={key:[value]}
        keys.update(request.query_params)
        page = int(request.query_params.get("page", 1))
        page_size = 15
        start = (page - 1) * page_size
        end = start + page_size
        
        sort_key = request.query_params.get("sort", None)
        order = '-' if 'desc_' in kwargs["pk"] else ''
        
        if 'asc_' in kwargs["pk"]:
            order = ''
        elif 'desc_' in kwargs["pk"]:
            order = '-'
            
        sort_order = f"{order}{sort_key}" if sort_key else None
        posts = self.model.objects.all()
        print(keys)
        for key, value in keys.items():
            match key:
                case "pk":
                    post = get_object_or_404(self.model, id=value[0])
                    serializer = self.serializer_class(post, many=False)
                    return Response(serializer.data)
                case "user":
                    posts = posts.filter(user=value[0])
                case "place":
                    posts = posts.filter(place=value[0])
                case "title":
                    posts = posts.filter(title__iregex=value[0].lower())
                case _:
                    pass

        if sort_order:
            posts = posts.order_by(sort_order)
        
        posts = posts[start:end]
        serializer = self.serializer_class(posts, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        post_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "title":
                    post_object.title = data["title"]
                case "content":
                    post_object.content = data["content"]
                case "like":
                    user = get_object_or_404(User, id=data["user"])
                    if UserPostLike.objects.filter(user=user, post_id=post_object.id).exists():
                        return Response({'error': 'User already liked this post'}, status=404)                    
                    UserPostLike(
                        user = user,
                        post = post_object
                    ).save()
                    post_object.like = post_object.like + 1 
                case "dislike":
                    user = get_object_or_404(User, id=data["user"])
                    if UserPostLike.objects.filter(user=user, post_id=post_object.id).exists():
                        UserPostLike.objects.filter(user=user, post_id=post_object.id).delete()
                        post_object.like = post_object.like - 1
                    else:
                        return Response({'error': "User don't liked this post"}, status=404)                    
                case _:
                    pass

        post_object.save()

        serializer = self.serializer_class(post_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        post_object = self.model.objects.get(id=kwargs["pk"])

        post_object.delete()
        serializer = self.serializer_class(post_object)
        return Response(serializer.data)
