from django.shortcuts import render

# Create your views here.
def shooting_home(request):
    return render(request, 'shooting/index.html')