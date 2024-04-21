from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, status

from memo_places.serializers import Changes_serializer, Places_serailizer, Questions_serializer, Path_serailizer
from .serializers import User_serializer, Types_serializer, Period_serializer, Sortof_serializer
from memo_places.models import Place, User, Question, Change, Sortof, Type, Period, Path
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
    model =Place
    serializer_class = Places_serailizer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])
        type = get_object_or_404(Type, id=request.data["type"])
        sortof = get_object_or_404(Sortof, id=request.data["sortof"])
        period = get_object_or_404(Period, id=request.data["period"])

        data = request.data
        new_place = self.model(
            user        = creator,
            place_name  = data["place_name"],
            description = data["description"],
            found_date  = data["found_date"],
            lng         = data["lng"],
            lat         = data["lat"],
            type        = type,
            sortof      = sortof,
            period      = period,
        )
        for key in data.keys():
            match key:
                case "verified":
                    new_place.verified = data["verified"]
                case "wiki_link":
                    new_place.wiki_link = data["wiki_link"]
                case "topic_link":
                    new_place.topic_link = data["topic_link"]
                case "outside":
                    new_place.img = data["img"]
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
            case "user":
                places = self.model.objects.filter(user=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)
            case "type":
                places = self.model.objects.filter(type=value)
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
            case "place_name":
                places = self.model.objects.filter(place_name=value)
                serializer = self.serializer_class(places, many=True)
                return Response(serializer.data)

        return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        place_object = self.model.objects.get(id=kwargs["pk"])

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
                    type_obj = Type.objects.filter(pk=data["type"])
                    place_object.type = type_obj 
                case "sortof":
                    sortof_obj = Sortof.objects.filter(pk=data["sortof"])
                    place_object.sortof = sortof_obj 
                case "period":
                    period_obj = Period.objects.filter(pk=data["period"])
                    place_object.period = period_obj 
                case "wiki_link":
                    place_object.wiki_link = data["wiki_link"]
                case "topic_link":
                    place_object.topic_link = data["topic_link"]
                case "img":
                    place_object.img = data["img"]
                case "verified":
                    place_object.verified = data["verified"]
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

class Path_view(viewsets.ModelViewSet):
    model = Path
    serializer_class = Path_serailizer

    def get_queryset(self):
        return self.model.objects.all()

    def create(self, request, *args, **kwargs):
        creator = get_object_or_404(User, id=request.data["user"])
        type = get_object_or_404(Type, id=request.data["type"])
        period = get_object_or_404(Period, id=request.data["period"])

        data = request.data
        new_path = self.model(
            user        = creator,
            path_name  = data["path_name"],
            description = data["description"],
            found_date  = data["found_date"],
            coordinates = data["coordinates"],
            type        = type,
            period      = period,
        )
        for key in data.keys():
            match key:
                case "wiki_link":
                    new_path.wiki_link = data["wiki_link"]
                case "topic_link":
                    new_path.topic_link = data["topic_link"]
                case "outside":
                    new_path.img = data["img"]
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
            case "user":
                paths = self.model.objects.filter(user=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "type":
                paths = self.model.objects.filter(type=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "period":
                paths = Place.objects.filter(period=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            case "path_name":
                paths = self.model.objects.filter(path_name=value)
                serializer = self.serializer_class(paths, many=True)
                return Response(serializer.data)
            #TODO
            # case "found_date":
            #     return Response(serializer.data)
            # case "creation_date":
            #     return Response(serializer.data)

        return Response({"Error": "Invalid key"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        path_object = self.model.objects.get(id=kwargs["pk"])

        data = request.data
        for i in data.keys():
            match i:
                case "user":
                    path_object.user = data["user"]
                case "path_name":
                    path_object.path_name = data["path_name"]
                case "description":
                    path_object.description = data["description"]
                case "found_date":
                    path_object.found_date = data["found_date"]
                case "creation_date":
                    path_object.creation_date = data["creation_date"]
                case "coordinates":
                    path_object.coordinates = data["coordinates"]
                case "type":
                    path_object.type = data["type"]
                case "period":
                    path_object.period = data["period"]
                case "wiki_link":
                    path_object.wiki_link = data["wiki_link"]
                case "topic_link":
                    path_object.topic_link = data["topic_link"]
                case "img":
                    path_object.img = data["img"]
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

class Outside_user_view(viewsets.ModelViewSet):
    model = User
    serializer_class = User_serializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        user_data = request.data

        alphabet = string.ascii_letters + string.digits + string.punctuation
        password = "".join(secrets.choice(alphabet) for _ in range(42))

        new_user = self.model.objects.create_user(
            email=user_data["email"], username=user_data["username"], password=password
        )

        new_user.outside = True
        new_user.save()

        serializer = self.serializer_class(new_user)

        return Response(serializer.data)

class User_view(viewsets.ModelViewSet):
    model = User
    serializer_class = User_serializer

    def get_queryset(self):
        return self.model.objects.all()  

    def create(self, request, *args, **kwargs):
        data= request.data
        new_user = self.model.objects.create_user(
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
        serializer = self.serializer_class(new_user)
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
                user = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(user, many=False)
            case "email":
                value = str(value).replace("&", ".")
                user = get_object_or_404(self.model, email=value)
                serializer = self.serializer_class(user)
            case "username":
                user = get_object_or_404(self.model, username=value)
                serializer = self.serializer_class(user)
            case "admin":
                user = self.model.objects.filter(admin=True)
                serializer = self.serializer_class(user, many=True)
            case "active":
                user = self.model.objects.filter(active=True)
                serializer = self.serializer_class(user, many=True)
            case "confirmed":
                user = self.model.objects.filter(confirmed=True)
                serializer = self.serializer_class(user, many=True)
            case "outside":
                user = self.model.objects.filter(outside=True)
                serializer = self.serializer_class(user, many=True)
            case "master":
                user = self.model.objects.filter(master=True)
                serializer = self.serializer_class(user, many=True)
            # case "data_join":
            #     #TODO 
        return Response({"Error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        # user_object = User.objects.get(id=kwargs['pk'])
        try:
            isinstance(int(kwargs["pk"]), int)
            user_object = self.model.objects.get(id=kwargs["pk"])
        except:
            key, value = re.match("(\w+)=(\d+)", kwargs["pk"]).groups()
            user_object = self.model.objects.get(id=value)

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

        serializer = self.serializer_class(user_object)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_object = self.model.objects.get(id=kwargs["pk"])
        user_object.delete()

        serializer = self.serializer_class(user_object)
        return Response(serializer.data)

class None_Verified_Places_view(viewsets.ModelViewSet):
    model =Place
    serializer_class = Places_serailizer

    def get_queryset(self):
        places = self.model.objects.filter(verified=True)
        serializer = self.serializer_class(places, many=True)
        return Response(serializer.data)
class Questions_view(viewsets.ModelViewSet):
    model = Question
    serializer_class = Questions_serializer

    def get_queryset(self):
        return self.model.objects.all() 

    def create(self, request, *args, **kwargs):
        try:
            user_object = self.model.objects.get(email=request.data['email'])
        except:
            user_object=None
        print(request.data)
        
        new_question = self.model(
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

        serializer = self.serializer_class(new_question)
        return Response(serializer.data) 

    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(.+)", kwargs["pk"]).groups()
        match key:
            case "pk":
                question_object = get_object_or_404(self.model, id=value)
                serializer = self.serializer_class(question_object, many=False)
            case "user":
                # user_object = get_object_or_404(User, pk=value)
                question_object = self.model.objects.filter(user=value)
                serializer = self.serializer_class(question_object,many=True)
            case "title":
                question_object = self.model.objects.filter(username=value)
                serializer = self.serializer_class(question_object,many=True)
            case "email":
                value = str(value).replace("&", ".")
                user_object = get_object_or_404(User, email=value)
                question_object = self.model.objects.filter(user=user_object.pk)
                serializer = self.serializer_class(question_object, many=True)
            case "done":
                question_object = self.model.objects.filter(done=json_bool(value))
                serializer = self.serializer_class(question_object, many=True)

        return Response({"Error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        question_object = self.model.objects.get(id=kwargs['pk'])

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

        serializer =self.model(question_object) 
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        question_object = self.model.objects.get(id=kwargs["pk"])
        question_object.delete()

        serializer = self.serializer_class(question_object)
        return Response(serializer.data)


class Changes_view(viewsets.ModelViewSet):
    model = Change
    serializer_class = Changes_serializer

    def get_queryset(self):
        return self.model.objects.all()  


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

class Sortofs_view(CategoryBaseView):
    serializer_class = Sortof_serializer 
    model = Sortof

class Periods_view(CategoryBaseView):
    serializer_class = Period_serializer 
    model = Period 