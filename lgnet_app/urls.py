from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from lgnet_app import views

app_name = 'lgnet'

urlpatterns = [
    path("api/planos/", views.planos_api, name="planos_api"),
    path('', views.homeView, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)