from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from rest_framework.renderers import JSONRenderer
from django.template.loader import render_to_string

from .serializers import (
    Places_serailizer,
    User_serializer,
    Short_Places_serailizer,
    Short_Path_serailizer,
    Questions_serializer,
    Changes_serializer,
    Path_serailizer,
    PlaceImage_serializer,
    PathImage_serializer,
)
from .models import Place, User, Question, Change, Path, Type, Sortof, Period, PlaceImage, PathImage
from admin_dashboard.serializers import (
    Types_serializer,
    Sortof_serializer,
    Period_serializer,
)
from dotenv import load_dotenv

import os
import re
import secrets
import string


load_dotenv()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["pk"] = user.id
        token["username"] = user.username
        token["admin"] = user.admin
        token["master"] = user.master
        token["email"] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class Place_view(viewsets.ModelViewSet):
    model = Place
    serializer_class = Places_serailizer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        data =request.data
        creator = get_object_or_404(User, id=data["user"])
        type = get_object_or_404(Type, id=data["type"])
        sortof = get_object_or_404(Sortof, id=data["sortof"])
        period = get_object_or_404(Period, id=data["period"])

        new_place = self.model(
            user=creator,
            place_name=data["place_name"],
            description=data["description"],
            lng=data["lng"],
            lat=data["lat"],
            type=type,
            sortof=sortof,
            period=period,
        )
        for key in data.keys():
            match key:
                case "wiki_link":
                    new_place.wiki_link = data["wiki_link"]
                case "topic_link":
                    new_place.topic_link = data["topic_link"]
                case _:
                    pass

        new_place.save()

        serializer = self.serializer_class(new_place)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                place = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(place, many=False)
                return Response(serializer.data)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(User, email=value)
                places = self.model.objects.filter(user=user.id)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)
            case "user":
                places = self.model.objects.filter(user=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)
            case "type":
                places = Place.objects.filter(type=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)
            case "sortof":
                places = self.model.objects.filter(sortof=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)
            case "period":
                places = self.model.objects.filter(period=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)

        return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        place_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "place_name":
                    place_object.place_name = data["place_name"]
                case "description":
                    place_object.description = data["description"]
                case "lat":
                    place_object.lat = data["lat"]
                case "lng":
                    place_object.lng = data["lng"]
                case "type":
                    type_obj = Type.objects.get(pk=data["type"])
                    place_object.type = type_obj
                case "sortof":
                    sortof_obj = Sortof.objects.get(pk=data["sortof"])
                    place_object.sortof = sortof_obj
                case "period":
                    period_obj = Period.objects.get(pk=data["period"])
                    place_object.period = period_obj
                case "verified":
                    place_object.verified = data["verified"].lower() == "true"
                case "wiki_link":
                    place_object.wiki_link = data["wiki_link"]
                case "topic_link":
                    place_object.topic_link = data["topic_link"]
                case _:
                    pass

        place_object.save()

        serializer = self.serializer_class(place_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        place_object = self.model.objects.get(id=kwargs["pk"])

        place_object.delete()
        serializer = self.serializer_class(place_object)
        return Response(serializer.data)


class Place_image_view(viewsets.ModelViewSet):
    model = PlaceImage
    serializer_class= PlaceImage_serializer

    def get_queryset(self):
        return self.model.objects.all()

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                placeimage = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(placeimage, many=False)
                return Response(serializer.data)
            case "place":
                place = get_object_or_404(Place, id=value)
                placeimage = self.model.objects.filter(place=place)
                serializer = self.serializer_class(placeimage, many=True)
                return Response(serializer.data)
            case _:
                return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        place_object = get_object_or_404(Place, id=request.data["place"])
        placeimage_object = self.model(
            place = place_object,
            img = request.data["img"] 
        )
        placeimage_object.save()
        serializer = self.serializer_class(placeimage_object)
        return Response(serializer.data)

class Path_image_view(viewsets.ModelViewSet):
    model = PathImage
    serializer_class= PathImage_serializer 

    def get_queryset(self):
        return self.model.objects.all()

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                pathimage = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(pathimage, many=False)
                return Response(serializer.data)
            case "path":
                path = get_object_or_404(Path, id=value)
                pathimage = self.model.objects.filter(path=path)
                serializer = self.serializer_class(pathimage, many=True)
                return Response(serializer.data)
            case _:
                return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        path_object = get_object_or_404(Path, id=request.data["path"])
        pathimage_object = self.model(
            path = path_object,
            img = request.data["img"] 
        )
        pathimage_object.save()
        serializer = self.serializer_class(pathimage_object)
        return Response(serializer.data)

class Path_view(viewsets.ModelViewSet):
    model = Path
    serializer_class = Path_serailizer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        creator = get_object_or_404(User, id=data["user"])
        type = get_object_or_404(Type, id=data["type"])
        period = get_object_or_404(Period, id=data["period"])

        new_path = self.model(
            user=creator,
            path_name=data["path_name"],
            description=data["description"],
            coordinates=data["coordinates"],
            type=type,
            period=period,
        )
        for key in data.keys():
            match key:
                case "wiki_link":
                    new_path.wiki_link = data["wiki_link"]
                case "topic_link":
                    new_path.topic_link = data["topic_link"]
                case _:
                    pass
        new_path.save()

        serializer = self.serializer_class(new_path)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                path = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(path, many=False)
                return Response(serializer.data)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(User, email=value)
                paths = self.model.objects.filter(user=user.id)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "user":
                paths = self.model.objects.filter(user=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "type":
                paths = Place.objects.filter(type=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "period":
                paths = self.model.objects.filter(period=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)

        return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        path_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "path_name":
                    path_object.path_name = data["path_name"]
                case "description":
                    path_object.description = data["description"]
                case "coordinates":
                    path_object.coordinates = (data["coordinates"],)
                case "type":
                    type_obj = Type.objects.get(pk=data["type"])
                    path_object.type = type_obj
                case "period":
                    period_obj = Period.objects.get(pk=data["period"])
                    path_object.period = period_obj
                case "verified":
                    path_object.verified = data["verified"].lower() == "true"
                case "wiki_link":
                    path_object.wiki_link = data["wiki_link"]
                case "topic_link":
                    path_object.topic_link = data["topic_link"]
                case _:
                    pass

        path_object.save()

        serializer = self.serializer_class(path_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        path_object = self.model.objects.get(id=kwargs["pk"])

        path_object.delete()
        serializer = self.serializer_class(path_object)
        return Response(serializer.data)


class ShortBaseView(viewsets.ModelViewSet):

    model =None 
    serializer_class = None 
    http_method_names = ["get"]

    def get_queryset(self):
        return self.model.objects.all()

class ShortPlaceView(ShortBaseView):
    model = Place
    serializer_class = Short_Places_serailizer

class ShortPathView(ShortBaseView):
    model = Path 
    serializer_class = Short_Path_serailizer

class Outside_user_view(viewsets.ModelViewSet):
    model = User
    serializer_class = User_serializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        user_data = request.data

        alphabet = string.ascii_letters + string.digits + string.punctuation
        password = "".join(secrets.choice(alphabet) for _ in range(42))

        new_user = self.model.objects.create_user(
            email = user_data["email"],
            username = user_data["username"],
            password = password
        )

        new_user.outside = True
        new_user.save()

        return Response(str(MyTokenObtainPairSerializer.get_token(user=new_user)))


class VerificationMail(viewsets.ModelViewSet):
    model = User
    http_method_names = ["put"]

    def update(self, request, *args, **kwargs):
        user_object = self.model.objects.get(id=kwargs["pk"])
        user_object.confirmed = True
        user_object.save()

        return Response("User activate")


class User_view(viewsets.ModelViewSet):
    model = User
    serializer_class = User_serializer

    def get_queryset(self):
        return self.model.objects.all()  # change to .none() on production

    def create(self, request, *args, **kwargs):
        if self.model.user_exists(request.data["email"]):
            return Response({"Error": "User exist"}, status=status.HTTP_400_BAD_REQUEST)

        new_user = self.model.objects.create_user(
            email=request.data["email"],
            username=request.data["username"],
            password=request.data["password"],
        )

        new_user.save()
        serializer = self.serializer_class(new_user)

        html_message = render_to_string(
            'verification_mail.html',
            {"link": f"http://localhost:3000/userVerification/{serializer['id'].value}"}
        )
        
        send_mail(
            subject="Verifictation mail",
            message="",
            from_email=os.getenv('EMAIL_HOST_USER'),
            recipient_list=[serializer["email"].value],
            fail_silently=False,
            html_message=html_message)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                user = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(user, many=False)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(self.model, email=value)
                serializer = self.serializer_class(user)
            case _:
                user = None
                return Response(
                    {"Error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
                )
        return Response(str(MyTokenObtainPairSerializer.get_token(user=user)))

    def update(self, request, *args, **kwargs):
        user_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "username":
                    user_object.username = data["username"]

        user_object.save()

        serializer = self.serializer_class(user_object)
        return Response(str(MyTokenObtainPairSerializer.get_token(user=user)))

    def destroy(self, request, *args, **kwargs):
        user_object = self.model.objects.get(id=kwargs["pk"])

        if user_object.confirmed == True:
            user_object.active = False
            user_object.save()
        else:
            user_object.delete()

        serializer = self.serializer_class(user_object)
        return Response(serializer.data)


class Contact_us(viewsets.ModelViewSet):
    model = Question
    http_method_names = ["post", "get"]
    serializer_class = Questions_serializer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            user_object = User.objects.get(email=request.data["email"])
        except:
            user_object = None

        new_question = self.model(
            user=user_object,
            title=request.data["title"],
            description=request.data["description"],
            done=False,
        )
        new_question.save()
        serializer = self.serializer_class(new_question)

        html_message = render_to_string('contact.html')

        if user_object:
            send_mail(
                subject="Thanks for contact",
                message="",
                from_email=os.getenv('EMAIL_HOST_USER'),
                recipient_list=[user_object.email],
                fail_silently=False,
                html_message=html_message)

        return Response(serializer.data)


class Changes(viewsets.ModelViewSet):
    model = Change
    serializer_class = Changes_serializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])
        new_changes = self.model(
            user= creator,
            changes_json=request.data["changes_json"],
        )
        new_changes.save()

        serializer = self.serializer_class(new_changes)
        return Response(serializer.data)


class Reset_password(viewsets.ModelViewSet):
    model = User
    serializer_class = User_serializer
    http_method_names = ["put"]

    def update(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                user = get_object_or_404(self.model, id=value)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(self.model, email=value)
            case _:
                user = None
                return Response(
                    {"Error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
                )

        html_message = render_to_string(
            'reset_password.html',
            {"link": f"SEBA HERE LINK"}
        )

        send_mail(
            subject="Reset password",
            message="",
            from_email=os.getenv('EMAIL_HOST_USER'),
            recipient_list=[user.email],
            fail_silently=False,
            html_message=html_message)

        return Response({"detail": "Succes"})


class CategoryBaseView(viewsets.ModelViewSet):
    serializer_class = None
    model = None

    def get_queryset(self):
        return self.model.objects.all()


class Types_view(CategoryBaseView):
    serializer_class = Types_serializer
    model = Type


class Sortofs_view(CategoryBaseView):
    serializer_class = Sortof_serializer
    model = Sortof


class Periods_view(CategoryBaseView):
    serializer_class = Period_serializer
    model = Period
