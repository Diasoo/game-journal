from rest_framework import serializers
from .models import Game, Genre, Platform, GameLog


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
        read_only_fields = ['id']


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id', 'name']
        read_only_fields = ['id']


class GameSerializer(serializers.ModelSerializer):
    genre = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True)
    platform = serializers.PrimaryKeyRelatedField(queryset=Platform.objects.all(), many=True)

    class Meta:
        model = Game
        fields = '__all__'
        read_only_fields = ['id', 'approved']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['genre'] = GenreSerializer(instance.genre.all(), many=True).data
        data['platform'] = PlatformSerializer(instance.platform.all(), many=True).data
        return data


class GameLogSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all())
    playthrough_type_display = serializers.CharField(source='get_playthrough_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = GameLog
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['game'] = GameSerializer(instance.game).data
        return data