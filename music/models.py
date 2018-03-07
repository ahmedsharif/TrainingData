from django.contrib.auth.models import User
from django.db import models
from django.core.validators import RegexValidator 


class Album(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE,validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    artist = models.CharField(max_length=250,validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    album_title = models.CharField(max_length=500,validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    genre = models.CharField(max_length=100,validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    album_logo = models.FileField()
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.album_title + ' - ' + self.artist
    
    
class Song(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE,validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    song_title = models.CharField(max_length=250, validators=[
        RegexValidator(
            regex= '^[a-zA-z0-9]*$',
            message='title must be alphanumeric',
            code='invalid Username'
        )
    ])
    audio_file = models.FileField(default='')
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.song_title


