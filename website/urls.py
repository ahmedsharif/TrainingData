from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^book/', include('books.urls'))
    url(r'^user/', include('books.urls'))
]
