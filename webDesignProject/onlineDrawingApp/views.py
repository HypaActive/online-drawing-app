from django.shortcuts import render
from django.http import JsonResponse

from dotenv import load_dotenv
import os

from faker import Faker
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant


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

def token(request):
    # generate fake username
    fake = Faker()
    username = fake.user_name()

    # get data for twilio from environment
    load_dotenv()
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    api_key = os.getenv('TWILIO_API_KEY')
    api_secret = os.getenv('TWILIO_API_SECRET')
    sync_service_sid = os.getenv('TWILIO_SYNC_SERVICE_SID', 'default')

    # generate token
    token = AccessToken(account_sid, api_key, api_secret, identity=username)
    # generate a grant and add to token
    sync_grant = SyncGrant(sync_service_sid)
    token.add_grant(sync_grant)
    # return token as JSON object
    return JsonResponse({'identity': username, 'token': token.to_jwt()})

def chat(request):
    return render(request, 'onlineDrawingApp/chat.html', {
        'room_name': "default"
    })