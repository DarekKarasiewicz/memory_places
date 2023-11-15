from rest_framework import serializers
from .models import Place

class Places_serailizer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'title', 'description', 'coordinates')
