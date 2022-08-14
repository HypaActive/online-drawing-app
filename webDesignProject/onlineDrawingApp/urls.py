from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('',views.index, name='index'),
    path('aboutUs.html',views.aboutUs, name='aboutUs'),
    path('contact.html',views.contact, name='contact'),
    path('draw.html',views.draw, name='draw'),
    path('shop.html',views.shop, name='shop'),
    path('howTo.html',views.howTo, name='howTo'),
    path('token', views.token, name='token'),
    path('chat.html', views.chat, name='chat')
]

urlpatterns += staticfiles_urlpatterns()