from django.shortcuts import render

# Create your views here.
def tetris_home(request):
    return render(request, 'tetris/index.html')