from rest_framework import viewsets, permissions

from ..models import GameLog
from ..serializers import GameLogSerializer


class GameLogViewSet(viewsets.ModelViewSet):
    queryset = GameLog.objects.all()
    serializer_class = GameLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return GameLog.objects.filter(user=self.request.user)