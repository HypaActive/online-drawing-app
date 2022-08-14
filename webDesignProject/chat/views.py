from email.policy import default
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'chat/index.html', {
        'room_name': "default"
    })