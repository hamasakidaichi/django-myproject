from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def clickrush_home(request):
    return render(request, 'ClickRush/clickrush_home.html')