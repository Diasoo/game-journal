from django.db import models
from django.core.validators import MinValueValidator

class User(models.Model):
    id = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.id


class Game(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    developer = models.CharField(max_length=255, blank=True, null=True)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    genre = models.ManyToManyField('Genre', related_name='games')
    platform = models.ManyToManyField('Platform', related_name='games')
    approved = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class GameLog(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('playing', 'Playing'),
        ('paused', 'Paused'),
        ('dropped', 'Dropped'),
        ('completed', 'Completed'),
    ]

    TYPE_CHOICES = [
        ("story", "Story"),
        ("story_side", "Story + Side Quests"),
        ("completionist", "Completionist"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_logs')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game_logs')

    rating = models.PositiveSmallIntegerField(null=True, blank=True)
    hours_played = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        default=0,
        validators=[MinValueValidator(0)]
    )
    started_at = models.DateField(null=True, blank=True)
    finished_at = models.DateField(null=True, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="planned")
    playthrough_type = models.CharField(max_length=20, choices=TYPE_CHOICES, blank=True, null=True)
    replay = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.id} - {self.game.title} ({self.status})"


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Platform(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name