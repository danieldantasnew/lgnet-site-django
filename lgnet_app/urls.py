from django.urls import path
from lgnet_app import views

app_name = 'lgnet'

urlpatterns = [
    path('', views.homeView, name='home'),
]