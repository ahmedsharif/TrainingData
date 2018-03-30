from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Album, Song, User


class AlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'user', 'artist', 'album_title',
                  'genre', 'album_logo', 'is_favorite']


class SongSerializers(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['album', 'song_title', 'audio_file', 'is_favorite']


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
