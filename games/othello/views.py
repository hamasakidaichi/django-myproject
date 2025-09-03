from django.shortcuts import render

# Create your views here.


def othello_home(request):
    return render(request, 'othello/index.html')