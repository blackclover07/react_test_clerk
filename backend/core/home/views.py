from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions
from django.http import HttpResponse
from svix.webhooks import Webhook, WebhookVerificationError
from django.views.decorators.csrf import csrf_exempt
import os
from home.models import User
import httpx


# Create your views here.


@api_view(['GET'])
def index(request):
    return Response({'messege':'hello from server and drf is working'})




@api_view(["POST"])
def sync_user(request):
    sdk=Clerk(
        bearer_auth=os.getenv("CLERK_SECRET_KEY")
    )
    
    try :
        request_state=sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173"]
            )
        )
        
        if not request_state.is_signed_in:
            return Response({
                "error":"Not Authenticated",
                "reason":str(request_state.reason)
            },status=status.HTTP_401_UNAUTHORIZED)
        
        payload=request_state.payload
        print(payload)
        clerk_user_id=payload["sub"]
        
        user,created=User.objects.get_or_create(
            clerk_id=clerk_user_id,
            defaults={
                "username":clerk_user_id,
            }
        )
        return Response({
            "user_id":user.id,
            "clerk_user_id":user.clerk_id,
            "created":created,
            "role":user.role
        })
        
        
    except Exception as e:
        return Response({
            "error":str(e)
        },status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        

 

 
webhook_secret_key = os.getenv("WEBHOOK_SECRET")
 
@csrf_exempt
def webhook_handler(request):
    headers = request.headers
    payload = request.body
 
    try:
        wh = Webhook(webhook_secret_key)
        msg = wh.verify(payload, headers)
        event_type=msg["type"]
        data=msg["data"]
        print("webhooks received")
        # print(msg)
        print(event_type)
        # print(data)
        
        if event_type=="user.created":
            clerk_id=data["id"]
            first_name=data["first_name"] or ""
            last_name=data["last_name"] or ""
            primary_email_id=data["primary_email_address_id"]
            email_address=next(
                e["email_address"]
                for e in data["email_addresses"]
                if e["id"] == primary_email_id
            )
            print(first_name)
            print(last_name)
            print(email_address)
            print(primary_email_id)
            print(email_address)
            user,created=User.objects.get_or_create(
                clerk_id=clerk_id,
                defaults={
                    "username":clerk_id,
                    "first_name":first_name,
                    "last_name":last_name,
                    "email":email_address
                }
            )
         
            print("user created",created)
        # user,created=User.objects.get_or_create()
        return HttpResponse(status=204)
    except WebhookVerificationError as e:
        print(e)
        return HttpResponse(status=400)
 
    # Do something with the message...
 
 
 
@api_view(["GET"])
def current_user(request):
    sdk = Clerk(
        bearer_auth=os.getenv("CLERK_SECRET_KEY")
    )

    try:
        request_state = sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173"]
            )
        )

        if not request_state.is_signed_in:
            return Response(
                {
                    "error": "Not Authenticated",
                    "reason": str(request_state.reason)
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        payload = request_state.payload
        clerk_user_id = payload["sub"]

        user = User.objects.get(clerk_id=clerk_user_id)

        return Response({
            "user_id": user.id,
            "role": user.role
        })

    except User.DoesNotExist:
        return Response(
            {
                "error": "User not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        return Response(
            {
                "error": str(e)
            },
            status=status.HTTP_400_BAD_REQUEST
        )




# @api_view(["GET"])
# def current_user(request:httpx.Request):
#     headers=request.headers.get("Authorization")
#     if not headers:
#         return Response({
#             "error":"NO authentication header"
#         },status=401)
#     token=headers.split(" ")[1]
#     print(token.strip())
#     sdk=Clerk(
#         bearer_auth=os.getenv("CLERK_SECRET_KEY")
#     )
    
#     httpx_request=httpx.Request(
#         method=request.method,
#         url=request.build_absolute_uri(),
#         headers=dict(request.headers)
#     )
    
#     try:
#          request_state=sdk.authenticate_request(
#             httpx_request,
#             AuthenticateRequestOptions(
#                 authorized_parties=["http://localhost:5173"]
#             )
#         )
#          print("Auth status",request_state.is_authenticated)
#          print("Singedn status : ",request_state.is_signed_in)
#          print("Reason : ",request_state.reason)
#          return Response({
#              "msg":"succesfully hit",
#              "signed status":request_state.is_signed_in,
#              "reason":request_state.reason
#          })
#     except Exception as e:
#         print(e)
#         return Response({
#             "error":str(e)
#         },status=401)
        
    