from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers
from . import views


app_name = 'music'


urlpatterns = [
    
    # url(r'^$', views.index, name='index'),
    url(r'^index_page/$', views.IndexPage.as_view(), name='index_page'),
    url(r'^register/$', views.register, name='register'),
    # url(r'^login_user/$', views.login_user, name='login_user'),
    url(r'^logout_user/$', views.logout_user, name='logout_user'),
    url(r'^create_album/$', views.create_album, name='create_album'),
    url(r'^(?P<album_id>[0-9]+)/create_song/$',
        views.create_song, name='create_song'),
    url(r'^(?P<album_id>[0-9]+)/delete_song/(?P<song_id>[0-9]+)/$',
        views.delete_song, name='delete_song'),
    url(r'^(?P<album_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^(?P<album_id>[0-9]+)/delete_album/$',
        views.delete_album, name='delete_album'),
    url(r'^(?P<album_id>[0-9]+)/favorite_album/$',
        views.favorite_album, name='favorite_album'),
    url(r'^(?P<song_id>[0-9]+)/favorite/$', views.favorite, name='favorite'),
    url(r'^songs/(?P<filter_by>[a-zA_Z]+)/$', views.songs, name='songs'),

    # for rest API urls
    


    url(r'^album_list/$', views.AlbumList.as_view(), name='album_list'),
    url(r'^song_list/$', views.SongList.as_view(), name='song_list'),
    url(r'^user_detail/$', views.UserDetail.as_view(), name='user_detail'),
    url(r'^login_user/$', views.LoginView.as_view(), name='login_user'),
    
    
    # url(r'^get_token/$', views.get_token, name='get_token'),
        #url(r'^login_user/$', views.LoginView.as_view(), name='login_user'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
