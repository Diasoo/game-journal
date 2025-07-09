from rest_framework import serializers
from .models import Game, Genre, Platform


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