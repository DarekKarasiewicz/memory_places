from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import Places_serailizer, User_serializer, Questions_serializer
from memo_places.models import Place, User, Question
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from rest_framework.renderers import JSONRenderer

import re
import secrets
import string


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["admin"] = user.admin
        token["master"] = user.master
        token["email"] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Place_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer

    def get_queryset(self):
        return Place.objects.all()

    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])

        new_place = Place(
            user=creator,
            place_name=request.data["place_name"],
            description=request.data["description"],
            found_date=request.data["found_date"],
            lng=request.data["lng"],
            lat=request.data["lat"],
            type=request.data["type"],
            sortof=request.data["sortof"],
            period=request.data["period"],
        )
        new_place.save()

        serializer = Places_serailizer(new_place)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                place = get_object_or_404(Place, id=value)
                serializer = Places_serailizer(place, many=False)
                return Response(serializer.data)
            case "user":
                places = Place.objects.filter(user=value)
                serializer = Places_serailizer(places, many=True)
                return Response(serializer.data)
            case "type":
                places = Place.objects.filter(type=value)
                serializer = Places_serailizer(places, many=True)
                return Response(serializer.data)
            case "sortof":
                places = Place.objects.filter(sortof=value)
                serializer = Places_serailizer(places, many=True)
                return Response(serializer.data)
            case "period":
                places = Place.objects.filter(period=value)
                serializer = Places_serailizer(places, many=True)
                return Response(serializer.data)
            case _:
                place = None
                return Response({"detail": "Invalid key"})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        place_object = Place.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "place_name":
                    place_object.place_name = data["place_name"]
                case "description":
                    place_object.description = data["description"]
                case "found_date":
                    place_object.found_date = data["found_date"]
                case "lat":
                    place_object.lat = data["lat"]
                case "lng":
                    place_object.lng = data["lng"]
                case "type":
                    place_object.type = data["type"]
                case "sortof":
                    place_object.sortof = data["sortof"]
                case "period":
                    place_object.period = data["period"]
                case _:
                    pass

        place_object.save()

        serializer = Places_serailizer(place_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        place_object = Place.objects.get(id=kwargs["pk"])

        place_object.delete()
        serializer = Places_serailizer(place_object)
        return Response(serializer.data)

class Outside_user_view(viewsets.ModelViewSet):
    serializer_class = User_serializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        user_data = request.data

        alphabet = string.ascii_letters + string.digits + string.punctuation
        password = "".join(secrets.choice(alphabet) for _ in range(42))

        new_user = User.objects.create_user(
            email=user_data["email"], username=user_data["username"], password=password
        )

        new_user.outside = True
        new_user.save()

        serializer = User_serializer(new_user)

        return Response(serializer.data)

class User_view(viewsets.ModelViewSet):
    serializer_class = User_serializer

    def get_queryset(self):
        return User.objects.all()  

    def create(self, request, *args, **kwargs):
        data= request.data
        new_user = User.objects.create_user(
            email=data["email"],
            username=data["username"],
            password=data["password"],
        )
        def json_bool(str):
            return str.lower()=="true"
        
        for key in data.keys():
            match key:
                case "admin":
                    print(json_bool(data["admin"]))
                    new_user.admin=json_bool(data["admin"])
                case "master":
                    new_user.master=json_bool(data["master"])
                case "outside":
                    new_user.outside=json_bool(data["outside"]) 
                case "active":
                    new_user.active=json_bool(data["active"])
                case "confirmed":
                    new_user.confirmed=json_bool(data["confirmed"]) 
        new_user.save()
        serializer = User_serializer(new_user)
        send_mail("Verifictation mail"
                , f'http://localhost:3000/userVerification/{serializer["id"].value}'
                #Env not in views
                ,'info@miejscapamieci.org.pl'
                , [serializer['email'].value]
                , fail_silently=False)
                # , html_message=)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                user = get_object_or_404(User, id=value)
                serializer = User_serializer(user, many=False)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(User, email=value)
                serializer = User_serializer(user)
            case "username":
                user = get_object_or_404(User, username=value)
                serializer = User_serializer(user)
            case "admin":
                user = User.objects.filter(admin=True)
                serializer = User_serializer(user, many=True)
            case "active":
                user = User.objects.filter(active=True)
                serializer = User_serializer(user, many=True)
            case "confirmed":
                user = User.objects.filter(confirmed=True)
                serializer = User_serializer(user, many=True)
            case "outside":
                user = User.objects.filter(outside=True)
                serializer = User_serializer(user, many=True)
            case "master":
                user = User.objects.filter(master=True)
                serializer = User_serializer(user, many=True)
            # case "data_join":
            #     #TODO 
            #     return Response({"detail": "Invalid request"})
            case _:
                user = None
                return Response({"detail": "Invalid request"})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # user_object = User.objects.get(id=kwargs['pk'])
        try:
            isinstance(int(kwargs["pk"]), int)
            user_object = User.objects.get(id=kwargs["pk"])
        except:
            key, value = re.match("(\w+)=(\d+)", kwargs["pk"]).groups()
            user_object = User.objects.get(id=value)

        data = request.data

        for i in data.keys():
            match i:
                case "email":
                    user_object.email = data["email"]
                case "username":
                    user_object.username = data["username"]
                case "password":
                    user_object.password = data["password"]
                case "outside":
                    user_object.outside = data["outside"]
                case "master":
                    user_object.master = data["master"]
                case "admin":
                    user_object.admin = data["admin"]
                case "active":
                    user_object.active = data["active"]
                case "confirmed":
                    user_object.confirmed = data["confirmed"]
                case "data_join":
                    user_object.data_join = data["data_join"]
                case _:
                    pass

        user_object.save()

        serializer = User_serializer(user_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_object = User.objects.get(id=kwargs["pk"])
        user_object.delete()

        serializer = User_serializer(user_object)
        return Response(serializer.data)
    
class Contact_us(viewsets.ModelViewSet):
    http_method_names = ['post','get']
    serializer_class = Questions_serializer

    def get_queryset(self):
        return Question.objects.all() 

    def create(self, request, *args, **kwargs):
        try:
            user_object = User.objects.get(email=request.data['email'])
        except:
            user_object=None
        
        new_question = Question(
            user=user_object,
            title=request.data['title'],
            description=request.data['desc'],
            done=False
        )
        new_question.save()

        send_mail("Thanks for contact"
                #Rethink about it 
                , "Thanks for your ....."
                #Env not in views
                ,'info@miejscapamieci.org.pl'
                , [request.data['email']]
                , fail_silently=False)
                # , html_message=) 

        serializer = Questions_serializer(new_question)
        return Response(serializer.data) 
        