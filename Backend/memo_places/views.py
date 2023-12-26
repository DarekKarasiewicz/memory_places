from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Places_serailizer
from .models import Place 
from rest_framework.response import Response


class Place_view(viewsets.ModelViewSet):
    serializer_class = Places_serailizer 
    
    def get_queryset(self):
        return Place.objects.all()
    
    def retrieve(self, request, *args, **kwargs):
        parms = kwargs
        place = Place.objects.filter(id=parms['pk'])
        serailizer= Places_serailizer(place, many=False)
        return Response(serailizer.data)

# Create your views here.
