from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    clerk_id = models.CharField(max_length=255, unique=True, null=True, blank=True)

    ROLE_CHOICES = [
        ("customer", "Customer"),
        ("admin", "Admin"),
        ("superadmin", "Super Admin"),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )
    class Meta:
        verbose_name="User"
        verbose_name_plural="Users"