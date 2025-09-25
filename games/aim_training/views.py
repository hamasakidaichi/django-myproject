from django.shortcuts import render

# Create your views here.
def aim_training_home(request):
    return render(request, 'aim_training/index.html')