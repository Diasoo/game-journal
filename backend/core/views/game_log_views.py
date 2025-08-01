from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_pandas.io import read_frame
import pandas as pd

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
            "total_logs": len(df),
            "total_hours_played": round(df["hours_played"].sum(), 2),
            "average_hours_played": round(df["hours_played"].mean(), 2),
            "average_rating": round(df["rating"].mean(), 2),
            "replay_count": df["replay"].sum(),
            "best_rated_game": df.loc[
                df["rating"].idxmax(), ["game", "rating"]
            ].to_dict(),
            "worst_rated_game": df.loc[
                df["rating"].idxmin(), ["game", "rating"]
            ].to_dict(),
            "most_hours_played": df.loc[
                df["hours_played"].idxmax(), ["game", "hours_played"]
            ].to_dict(),
        }
        return Response(stats, status=200)

    @action(detail=False, methods=["get"], url_path="stats/per_year")
    def stats_per_year(self, request):
        qs = self.queryset.filter(user=request.user)

        if not qs.exists():
            return Response({"message: No game sessions found."}, status=404)

        df = read_frame(qs)
        df["finished_at"] = pd.to_datetime(df["finished_at"])
        df["year"] = df["finished_at"].dt.year

        stats = {"number_of_games": df.groupby("year")["id"].count().to_dict()}
        return Response(stats, status=200)
