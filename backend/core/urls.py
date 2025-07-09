from django.urls import path, include

from .routers import SlashOptionalRouter
from .views.game_views import GameViewSet


router = SlashOptionalRouter()
router.register(r'games', GameViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]