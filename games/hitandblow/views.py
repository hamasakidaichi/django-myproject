from django.shortcuts import render

# Create your views here.
def hitandblow_home(request):
    return render(request, 'hitandblow/index.html')