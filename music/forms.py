from django import forms
from django.contrib.auth.models import User
from django.core import validators
from django.core.exceptions import ValidationError
from django.forms import CharField

from .models import Album, Song


class SlugField(CharField):
    default_validators = [validators.validate_slug]


class AlbumForm(forms.ModelForm):
    artist = forms.CharField(validators=[validators.validate_slug])
    genre = forms.CharField(validators=[validators.validate_slug])
    album_title = forms.CharField(max_length=250, validators=[
                                  validators.validate_slug])

    class Meta:
        model = Album
        fields = ['artist', 'album_title', 'genre', 'album_logo']

    def clean(self):
        albums = ['CoilSpring2', 'Cash Album', 'TVOnTheRadio', 'CoilSpring']
        clean_data = super(AlbumForm, self).clean()
        album_title = clean_data.get('album_title')

        # if album name doesn't match with list 
        if album_title not in albums:
            raise ValidationError({
                'album_title': ValidationError(('Invalid Album name ', albums), code='invalid'),
                'artist': ValidationError(('Invalid Artist name.'), code='invalid'),
            })


class SongForm(forms.ModelForm):
    song_title = forms.CharField(validators=[validators.validate_slug])

    class Meta:
        model = Song
        fields = ['song_title', 'audio_file']


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
