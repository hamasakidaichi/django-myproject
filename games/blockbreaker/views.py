from django.shortcuts import render

# Create your views here.
def blockbreaker_home(request):
    return render(request, 'blockbreaker/index.html')