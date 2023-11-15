from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Places_serailizer
from .models import Place 

# Create your views here.

class Place_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer 
    queryset = Place.objects.all()
# Create your views here.
