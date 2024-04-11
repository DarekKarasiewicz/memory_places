from django.contrib import admin
from .models import Place, User,Period,Sortof,Type


# Register your models here.
admin.site.register(User)
admin.site.register(Place)
admin.site.register(Type)
admin.site.register(Sortof)
admin.site.register(Period)
