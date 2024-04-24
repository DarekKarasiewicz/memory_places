from django.contrib import admin
from .models import Comment, Subforum, Post

admin.site.register(Comment)
admin.site.register(Subforum)
admin.site.register(Post)
