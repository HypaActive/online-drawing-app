from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.
def index(request):
    return render(request, 'onlineDrawingApp/index.html')

def aboutUs(request):
    return render(request, 'onlineDrawingApp/aboutUs.html')

def contact(request):
    return render(request, 'onlineDrawingApp/contact.html')

def draw(request):
    return render(request, 'onlineDrawingApp/draw.html')

def shop(request):
    return render(request, 'onlineDrawingApp/shop.html')

def howTo(request):
    return render(request, 'onlineDrawingApp/howTo.html')
