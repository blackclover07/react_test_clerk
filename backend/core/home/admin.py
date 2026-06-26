from django.contrib import admin
from home.models  import User
from django.contrib.auth.admin import UserAdmin


# Register your models here.
@admin.register(User)
class UserAdmin(UserAdmin):
   list_display=("id","username","email","role","clerk_id","is_staff","is_active")
        
        
   fieldsets = UserAdmin.fieldsets+(
       (None, {
           "fields": (
               "role",   
           ),
       }),
   )
   
