from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Album, Song, User
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, exceptions
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
# from django.utils import import_callable


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
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})
    token = serializers.CharField(allow_blank=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',
        ]

    # def validate(self, username, password):
    #     if username and password:
    #         user = authenticate(username=username, password=password)
    #     else:
    #         msg = _('Must include "username" and "password".')
    #         raise exceptions.ValidationError(msg)

    #     return user


# class JWTSerializer(serializers.Serializer):
#     """
#     Serializer for JWT authentication.
#     """
#     token = serializers.CharField()
#     user = serializers.SerializerMethodField()

#     def get_user(self, obj):
#         """
#         Required to allow using custom USER_DETAILS_SERIALIZER in
#         JWTSerializer. Defining it here to avoid circular imports
#         """
#         rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
#         JWTUserDetailsSerializer = import_callable(
#             rest_auth_serializers.get(
#                 'USER_DETAILS_SERIALIZER', UserDetailsSerializer)
#         )
#         user_data = JWTUserDetailsSerializer(
#             obj['user'], context=self.context).data
#         return user_data
