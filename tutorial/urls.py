from django.contrib import admin,auth
from django.urls import path, include
from django.conf.urls import include, url
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/login/', include('django.contrib.auth.urls'), name='login'),
    path('accounts/password_change/', include('django.contrib.auth.urls')),

    #path('logout/', auth_views.logout, name='logout'),
]
