from django.urls import path, include

from .routers import SlashOptionalRouter
from .views.game_views import GameViewSet
from .views.genre_views import GenreViewSet
from .views.platform_views import PlatformViewSet
from .views.game_log_views import GameLogViewSet


router = SlashOptionalRouter()
router.register(r'games', GameViewSet)
router.register(r'genres', GenreViewSet)
router.register(r'platforms', PlatformViewSet)
router.register(r'game_logs', GameLogViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]