from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import Places_serailizer, User_serializer
from .models import Place, User
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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
        place = get_object_or_404(Place, id=kwargs['pk'])
        serializer = Places_serailizer(place, many=False)
        return Response(serializer.data)

class User_view(viewsets.ModelViewSet):
    serializer_class =User_serializer
    http_method_names = ['post']

    def get_queryset(self):
        return User.objects.none()