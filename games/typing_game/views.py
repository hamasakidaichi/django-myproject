from django.shortcuts import render

# Create your views here.
def typing_game_home(request):
    return render(request, 'typing_game/index.html')