from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets

from memo_places.serializers import Changes_serializer, Places_serailizer, Questions_serializer
from .serializers import User_serializer, Types_serializer,Period_serializer,Sortof_serializer
from memo_places.models import Place, User, Question, Change, Sortof, Type, Period
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from rest_framework.renderers import JSONRenderer

import re
import secrets
import string
import unicodedata


def json_bool(str):
    return str.lower()=="true"

class Place_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer

    def get_queryset(self):
        return Place.objects.all()

    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])

        data = request.data
        new_place = Place(
            user        = creator,
            place_name  = data["place_name"],
            description = data["description"],
            found_date  = data["found_date"],
            lng         = data["lng"],
            lat         = data["lat"],
            type        = data["type"],
            sortof      = data["sortof"],
            period      = data["period"],
        )
        for key in data.keys():
            match key:
                case "wiki_link":
                    new_place.wiki_link = data["wiki_link"]
                case "topic_link":
                    new_place.topic_link = data["topic_link"]
                case "outside":
                    new_place.img = data["img"]
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
            case "place_name":
                places = Place.objects.filter(place_name=value)
                serializer = Places_serailizer(places, many=True)
                return Response(serializer.data)
            #TODO
            # case "found_date":
            #     return Response(serializer.data)
            # case "creation_date":
            #     return Response(serializer.data)
            case _:
                place = None
                return Response({"detail": "Invalid key"})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        place_object = Place.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "user":
                    place_object.user = data["user"]
                case "place_name":
                    place_object.place_name = data["place_name"]
                case "description":
                    place_object.description = data["description"]
                case "found_date":
                    place_object.found_date = data["found_date"]
                case "creation_date":
                    place_object.creation_date = data["creation_date"]
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
                case "wiki_link":
                    place_object.wiki_link = data["wiki_link"]
                case "topic_link":
                    place_object.topic_link = data["topic_link"]
                case "img":
                    place_object.img = data["img"]
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

class None_Verified_Places_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer

    def get_queryset(self):
        places = Place.objects.filter(verified=True)
        serializer = Places_serailizer(places, many=True)
        return Response(serializer.data)
class Questions_view(viewsets.ModelViewSet):
    serializer_class = Questions_serializer

    def get_queryset(self):
        return Question.objects.all() 

    def create(self, request, *args, **kwargs):
        try:
            user_object = User.objects.get(email=request.data['email'])
        except:
            user_object=None
        print(request.data)
        
        new_question = Question(
            user=user_object,
            title=request.data['title'],
            description=request.data['description'],
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

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                question_object = get_object_or_404(User, id=value)
                serializer = Questions_serializer(question_object, many=False)
            case "user":
                # user_object = get_object_or_404(User, pk=value)
                question_object = Question.objects.filter(user=value)
                serializer = Questions_serializer(question_object,many=True)
            case "title":
                question_object = Question.objects.filter(username=value)
                serializer = Questions_serializer(question_object,many=True)
            case "email":
                value = str(value).replace("&", ".")
                user_object = get_object_or_404(User, email=value)
                question_object = Question.objects.filter(user=user_object.pk)
                serializer = Questions_serializer(question_object, many=True)
            case "done":
                question_object = Question.objects.filter(done=json_bool(value))
                serializer = Questions_serializer(question_object, many=True)
            case _:
                question = None
                return Response({"detail": "Invalid request"})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        question_object = Question.objects.get(id=kwargs['pk'])

        data = request.data

        for i in data.keys():
            match i:
                case "user":
                    question_object.user = data["user"]
                case "title":
                    question_object.title = data["title"]
                case "description":
                    question_object.description = data["description"]
                case "done":
                    question_object.done =json_bool(data["done"])
                case _:
                    pass

        question_object.save()

        serializer =Questions_serializer(question_object) 
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        question_object = Question.objects.get(id=kwargs["pk"])
        question_object.delete()

        serializer = Questions_serializer(question_object)
        return Response(serializer.data)


class Changes_view(viewsets.ModelViewSet):
    serializer_class = Changes_serializer

    def get_queryset(self):
        return Change.objects.all()  


def clean_string(string):
    string = re.sub(r'[_\-!@#$%^&*()+=\[\]{};:\'",.<>?/\\|`~]', '', string)
    string = string.replace(" ", "_") 
    string = unicodedata.normalize('NFD', string).encode('ascii', 'ignore').decode("utf-8") 
    string = string.strip("_") 
    return string

class CategoryBaseView(viewsets.ModelViewSet):
    serializer_class = None 
    model = None

    def get_queryset(self):
        return self.model.objects.all()  

    def create(self, request, *args, **kwargs):

        new_type = self.model(
            name  = request.data['name'],
            value = clean_string(request.data['value']),
            order = request.data['order'],
        )
        new_type.save()

        serializer = self.serializer_class(new_type)
        return Response(serializer.data) 

    def update(self, request, *args, **kwargs):
        type_object = self.model.objects.get(id=kwargs['pk'])

        for i in request.data.keys():
            match i:
                case "name":
                    type_object.name = request.data['name']
                case "value":
                    type_object.name = request.data['value']
                case "order":
                    type_object.name = request.data['order']
                case _:
                    pass

        type_object.save()

        serializer = self.serializer_class(type_object) 
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        type_object = self.model.objects.get(id=kwargs["pk"])
        type_object.delete()

        serializer = self.serializer_class(type_object)
        return Response(serializer.data)

class Types_view(CategoryBaseView):
    serializer_class = Types_serializer 
    model = Type 

class Sortofs_view(viewsets.ModelViewSet):
    serializer_class = Sortof_serializer 
    model = Sortof

class Periods_view(viewsets.ModelViewSet):
    serializer_class = Period_serializer 
    model = Period 