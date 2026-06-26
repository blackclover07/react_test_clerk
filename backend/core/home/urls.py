from django.urls import path
# from .views import index
import home.views as views

urlpatterns = [
    path('', views.index),
    path('auth/sync-user/', views.sync_user),
    path('auth/webhooks/clerk/', views.webhook_handler),
    path('auth/me/', views.current_user),
]
