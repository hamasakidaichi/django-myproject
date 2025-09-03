from django.urls import path
from . import views

urlpatterns = [
    path('', views.blockbreaker_home, name='blockbreaker_home'),
]