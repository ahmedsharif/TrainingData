from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models

text_validator = RegexValidator(
    regex='^[a-zA-z0-9]*$',
    message='title must be alphanumeric',
    code='invalid Username'
)


class Album(models.Model):
    user = models.ForeignKey(
        User, default=1, related_name='album', on_delete=models.CASCADE)
    artist = models.CharField(max_length=250, validators=[
        text_validator
    ])
    album_title = models.CharField(max_length=500, validators=[
        text_validator
    ])
    genre = models.CharField(max_length=100, validators=[
        text_validator
    ])
    album_logo = models.FileField()
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.album_title + ' - ' + self.artist


class Song(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, validators=[
        text_validator
    ])
    song_title = models.CharField(max_length=250, validators=[
        text_validator
    ])
    audio_file = models.FileField(default='')
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.song_title
