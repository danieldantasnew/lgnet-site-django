from django.contrib import admin
from django.urls import path, include
from lgnet_app.views import custom_not_found

handler404 = custom_not_found

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('lgnet_app.urls')),
]

