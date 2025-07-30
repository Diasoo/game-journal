from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_pandas.io import read_frame

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

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request):
        qs = self.queryset.filter(user=request.user)

        if not qs.exists():
            return Response({"message: No game sessions found."}, status=404)

        df = read_frame(qs)

        stats = {
            "average_hours_played": round(df["hours_played"].mean(), 2),
            "total_logs": len(df),
        }
        return Response(stats)
