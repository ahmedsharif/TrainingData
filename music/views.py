from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from music.serializers import AlbumSerializers, SongSerializers, UserSerializers
from .forms import AlbumForm, SongForm, UserForm
from .models import Album, Song, User
from django.views import generic, View
import jwt
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.renderers import TemplateHTMLRenderer

# Create your views here.
IMG_File_Type = ['jpg', 'png', 'jpeg']
Audio_File_Type = ['wav', 'mp3', 'ogg']


# def index(request):
#     if not request.user.is_authenticated():
#         return render(request, 'music/login.html')
#     else:
#         albums = Album.objects.filter(user=request.user)
#         song_results = Song.objects.all()
#         query = request.GET.get("q")
#         if query:
#             albums = albums.filter(
#                 Q(album_title__icontains=query) |
#                 Q(artist__icontains=query)
#             ).distinct()
#             song_results = song_results.filter(
#                 Q(song_title__icontains=query)
#             ).distinct()
#             return render(request, 'music/index.html', {
#                 'albums': albums,
#                 'songs': song_results,
#             })
#         else:
#             return render(request, 'music/index.html', {'albums': albums})


class IndexPage(generic.ListView):
    template_name = 'music/index.html'
    context_object_name = 'albums'

    def get_queryset(self):
        # if self.request.COOKIES["token"]:
        if self.request.COOKIES.get("token", None):
            cookie_data = self.request.COOKIES["token"]
            token = jwt.decode(cookie_data, 'secret', algorithms=['HS256'])

            albums = Album.objects.filter(user=self.request.user)
            song_results = Song.objects.all()
            data = {}
            query = self.request.GET.get("q")
            if query:
                albums = albums.filter(
                    Q(album_title__icontains=query) |
                    Q(artist__icontains=query)
                ).distinct()
                song_results = song_results.filter(
                    Q(song_title__icontains=query)
                ).distinct()
                data['albums'].append(albums)
                data['songs'].append(song_results)
            return data
        else:
            response = redirect('music:login_user')
            return response


class LoginView(APIView):
    serializer_class = UserSerializers
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'music/login.html'
    context_object_name = 'abc'

    def get(self, request):
        serializers = UserSerializers()
        return Response({'serializers': serializers}, status=status.HTTP_200_OK)

    def post(self, request):
        serializers = UserSerializers(data=request.data)
        if serializers.is_valid():
            # response = redirect('music/index.html')
            username = serializers.validated_data.get('username')
            password = serializers.validated_data.get('password')
            data = {
                "username": username, "password": password
            }
            user = authenticate(username=serializers.validated_data.get('username'),
                                password=serializers.validated_data.get('password'))
            if user and user.is_active:
                print(reverse('music:index_page'))
                response = redirect('music:index_page')
                token = jwt.encode(data, "secret")
                response.set_cookie("token", token)
                login(request, user)
                return response
            return Response({'serializers': serializers, 'errors': 'Invalid Credentials'}, status=status.HTTP_200_OK)
        return Response({'serializers': serializers}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def post(self, request):
        response = HttpResponse("works")
        response.delete_cookie("token")
        response = redirect('music:login_user')
        logout(request)
        # return Response(status=status.HTTP_200_OK)
        return response


# class Logout(APIView):
#     queryset = User.objects.all()
#     renderer_classes = [TemplateHTMLRenderer]
#     template_name = 'music/login.html'
#     context_object_name = 'abc'
#
#     def get(self, request):
#         # simply delete the token to force a login
#         if 'token' in request.COOKIES:
#             response = HttpResponse("works")
#             response.delete_cookie('token')
#             logout(request)
#             return Response(status=status.HTTP_200_OK)
#
#     def post(self, request):
#         if 'token' in request.COOKIES:
#             logout(request)
#             response = HttpResponse("works")
#             response.delete_cookie('token')
#             return Response(status=status.HTTP_200_OK)


# class Logout(APIView):
#     renderer_classes = [TemplateHTMLRenderer]
#     template_name = 'music/test.html'
#     context_object_name = 'abc'
#
#     def post(self, request):
#         queryset = User.objects.all()
#         response = redirect('music:login_user')
#         return response


# def login_user(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 albums = Album.objects.filter(user=request.user)
#                 return render(request, 'music/index.html', {'albums': albums})

#                 # encrypt credentials into JWT l
#                 #encoded = jwt.encode({'username': username, 'password':password}, 'secret', algorithm='HS256')
#                 #response.set_cookie('key', encoded)
#                 # return response
#             else:
#                 return render(request, 'music/login.html', {'error_message': 'Your account has been disabled'})
#         else:
#             return render(request, 'music/login.html', {'error_message': 'Invalid login'})
#     return render(request, 'music/login.html')


# class UserLogin(request):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializers
#     permission_classes = (permissions.IsAuthenticated,)

# def get_token(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         dict = {
#             'username':username,
#             'password':password,
#         }
#         response = render(request,'music/index.html',dict)
#         return response


# def logout_user(request):
#     logout(request)
#     form = UserForm(request.POST or None)
#
#     context = {
#         "form": form,
#     }
#     response = render(request, 'music/login.html', context)
#     response.delete_cookie('token')
#     return response


def register(request):
    form = UserForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user.set_password(password)
        user.save()
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                albums = Album.objects.filter(user=request.user)
                return render(request, 'music/index.html', {'albums': albums})
    context = {
        "form": form,
    }
    return render(request, 'music/register.html', context)


def create_album(request):
    # if 'key' in request.COOKIES:
    #     value = request.COOKIES['key']
    # result = jwt.decode(value, 'secret', algorithms=['HS256'])

    if not request.user.is_authenticated():
        return render(request, 'music/login.html')
    else:
        form = AlbumForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            album = form.save(commit=False)
            album.user = request.user
            album.album_logo = request.FILES['album_logo']
            file_type = album.album_logo.url.split('.')[-1]
            file_type = file_type.lower()
            if file_type not in IMG_File_Type:
                context = {
                    'album': album,
                    'form': form,
                    'error_message': 'Image file must be PNG, JPG, or JPEG',
                }
                return render(request, 'music/create_album.html', context)
            album.save()
            return render(request, 'music/detail.html', {'album': album})
        context = {
            "form": form,
        }
        return render(request, 'music/create_album.html', context)


def create_song(request, album_id):
    if not request.user.is_authenticated():
        return render(request, 'music/login.html')
    else:
        form = SongForm(request.POST or None, request.FILES or None)
        album = get_object_or_404(Album, pk=album_id)
        if form.is_valid():
            albums_songs = album.song_set.all()
            for s in albums_songs:
                if s.song_title == form.cleaned_data.get("song_title"):
                    context = {
                        'album': album,
                        'form': form,
                        'error_message': 'You already added that song',
                    }
                    return render(request, 'music/create_song.html', context)
            song = form.save(commit=False)
            song.album = album
            song.audio_file = request.FILES['audio_file']
            file_type = song.audio_file.url.split('.')[-1]
            file_type = file_type.lower()
            if file_type not in Audio_File_Type:
                context = {
                    'album': album,
                    'form': form,
                    'error_message': 'Audio file must be WAV, MP3, or OGG',
                }
                return render(request, 'music/create_song.html', context)

            song.save()
            return render(request, 'music/detail.html', {'album': album})
        context = {
            'album': album,
            'form': form,
        }
        return render(request, 'music/create_song.html', context)


def delete_song(request, album_id, song_id):
    album = get_object_or_404(Album, pk=album_id)
    song = Song.objects.get(pk=song_id)
    song.delete()
    return render(request, 'music/detail.html', {'album': album})


def delete_album(request, album_id):
    album = get_object_or_404(Album, pk=album_id)
    album.delete()
    albums = Album.objects.filter(user=request.user)
    return render(request, 'music/index.html', {'albums': albums})


def detail(request, album_id):
    if not request.user.is_authenticated():
        return render(request, 'music/login.html')
    else:
        user = request.user
        album = get_object_or_404(Album, pk=album_id)
        return render(request, 'music/detail.html', {'album': album, 'user': user})


def favorite_album(request, album_id):
    album = get_object_or_404(Album, pk=album_id)
    try:
        if album.is_favorite:
            album.is_favorite = False
        else:
            album.is_favorite = True
        album.save()
    except (KeyError, Album.DoesNotExist):
        return JsonResponse({'success': False})
    else:
        return JsonResponse({'success': True})


def favorite(request, song_id):
    song = get_object_or_404(Song, pk=song_id)
    try:
        if song.is_favorite:
            song.is_favorite = False
        else:
            song.is_favorite = True
        song.save()
    except(KeyError, Song.DoesNotExist):
        return JsonResponse({'success': False})
    else:
        return JsonResponse({'success': True})


def songs(request, filter_by):
    if not request.user.is_authenticated():
        return render(request, 'music/login.html')
    else:
        try:
            song_ids = []
            for album in Album.objects.filter(user=request.user):
                for song in album.song_set.all():
                    song_ids.append(song.pk)
            users_songs = Song.objects.filter(pk__in=song_ids)
            if filter_by == 'favorites':
                users_songs = users_songs.filter(is_favorite=True)
        except Album.DoesNotExist:
            users_songs = []
        return render(request, 'music/songs.html', {
            'song_list': users_songs,
            'filter_by': filter_by,
        })


# class SongView(LoginRequiredMixin, generics.ListCreateAPIView):
#     template_name = 'music/songs.html'
#     context_object_name = 'songs'

#     def get_songs_list(self):
#         if self.request.user.has

class SummarySongs(generics.RetrieveUpdateDestroyAPIView):
    # template_name = 'music/detail.html'
    queryset = Song.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer = SongSerializers()

    def get(self, request):
        return Response(template_name='music/detail.html')
        # return render(request, self.template_name, queryset)


# class AlbumList(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Album.objects.all()
#     # serializer_class = AlbumSerializers
#     # renderer_classes = [TemplateHTMLRenderer]
#     # template_name = 'music/detail.html'
#     # permission_classes = (permissions.IsAuthenticated,)


#     # def get(self, request, *args, **kwargs):
#     #     item = get_object_or_404(Album.objects.all(), pk=kwargs['pk']) 
#     #     # return render(request, self.template_name, context)
#     #     return render(request, self.template_name, item)

#     serializer_class = AlbumSerializers
#     permission_classes = (permissions.is_authenticated,)

class AlbumList(LoginRequiredMixin, generic.ListView):
    template_name = 'music/test.html'
    context_object_name = 'test'

    def get_queryset(self):
        return Album.objects.all()


class AlbumDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializers
    permission_classes = (permissions.IsAuthenticated,)


class SongList(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializers
    permission_classes = (permissions.IsAuthenticated,)


class SongDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializers
    permission_classes = (permissions.IsAuthenticated,)


class UserDetail(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = (permissions.IsAuthenticated,)
