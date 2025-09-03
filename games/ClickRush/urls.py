from django.urls import path
from . import views

urlpatterns = [
    path('', views.clickrush_home, name='clickrush_home'),
]