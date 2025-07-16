from django.urls import path
from . import views

urlpatterns = [
    path('scrape-reddit/', views.scrape_reddit_profile, name='scrape_reddit'),
]
