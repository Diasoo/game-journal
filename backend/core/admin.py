from django.contrib import admin

from .models import User, Game, GameLog, Genre, Platform

admin.site.register(User)
admin.site.register(Game)
admin.site.register(GameLog)
admin.site.register(Genre)
admin.site.register(Platform)