from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from lgnet_app import views

app_name = 'lgnet'

urlpatterns = [
    path("api/planos/", views.planos_api, name="planos_api"),
    path("sobre", views.sobre, name="sobre"),
    path("contato", views.contato, name="contato"),
    path('', views.inicio, name='inicio'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)