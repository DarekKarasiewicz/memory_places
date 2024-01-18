from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import Places_serailizer, User_serializer
from .models import Place, User
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import re

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['admin'] = user.admin
        token['master'] = user.master
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

class Place_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer 
    
    def get_queryset(self):
        return Place.objects.all()
 
    def retrieve(self, request, *args, **kwargs):
        key, value = re.match("(\w+)=(\d+)", kwargs['pk']).groups()
        match key:
            case "pk":
                place = get_object_or_404(Place, id=value)
                serializer = Places_serailizer(place, many=False)
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
                return Response({'detail': 'Invalid key'})
        return Response(serializer.data)
   
    def update(self, request, *args, **kwargs):
        place_object = Place.objects.get(id=kwargs['pk'])

        data = request.data

        place_object.user = data["user"]
        place_object.place_name = data["place_name"]
        place_object.description = data["description"]
        place_object.found_date = data["found_date"]
        place_object.lat = data["lat"]
        place_object.lng = data["lng"]
        place_object.type = data["type"]
        place_object.sortof = data["sortof"]
        place_object.period = data["period"]

        place_object.save()

        serializer = Places_serailizer(place_object)
        return Response(serializer.data)

    def destroy(self, request,*args, **kwargs):
        place_object = Place.objects.get(id=kwargs['pk'])

        place_object.delete()
        serializer = Places_serailizer(place_object)
        return Response(serializer.data)
class User_view(viewsets.ModelViewSet):
    serializer_class =User_serializer
    # http_method_names = ['post','put','delete']
 
    def get_queryset(self):
        return User.objects.all()

    def update(self, request, *args, **kwargs):
        # user_object = User.objects.get(id=kwargs['pk'])
        try:
            print(isinstance(int(kwargs['pk']),int))
            user_object = User.objects.get(id=kwargs['pk'])
        except:
            key, value = re.match("(\w+)=(\d+)", kwargs['pk']).groups()
            user_object = User.objects.get(id=value)
            
        data = request.data
        if key == "password_reset":
            user_object.set_password(data['password'])
        else:
            user_object.email = data["email"]
            user_object.username = data["username"]
            user_object.full_name = data["full_name"]
            user_object.phone = data["phone"]
            user_object.fb_link = data["fb_link"]

        user_object.save()

        serializer = User_serializer(user_object)
        return Response(serializer.data)

    def destroy(self, request,*args, **kwargs):
        user_object = User.objects.get(id=kwargs['pk'])

        user_object.active=False

        user_object.save()

        serializer = User_serializer(user_object)
        return Response(serializer.data)