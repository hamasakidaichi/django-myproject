from django.shortcuts import render

# Create your views here.
def game_2048_home(request):
    return render(request, 'game_2048/index.html')