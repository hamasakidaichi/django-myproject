from django.shortcuts import render

# Create your views here.
def battle_home(request):
    return render(request, 'battle/index.html')