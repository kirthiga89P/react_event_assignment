from django.shortcuts import render
from .seriallizer import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.db.models import F,Q
from rest_framework.permissions import AllowAny

# Create your views here.
class User_Detail:
    #To get the User id of the login User
    def get_user_id(request):
        user_id=0
        
        token=Token.objects.filter(key=(request.headers.get('authorization'))[6:]).values('user_id')
        for i in token:
            user_id=i.get('user_id')
        return user_id
class EventCreateJsonDBView(viewsets.GenericViewSet):  
   #To create a Event 
    def post(self,request):   
        user_id=User_Detail.get_user_id(request);        
        request.data.update({'user':user_id})           
        serializer = EventCreateSerializer(data=request.data)       
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class EventViewJsonDBView(viewsets.GenericViewSet):
    #permission_classes = [ AllowAny]  
   #To get the events created by all User
    def get_all(self,request):
        if request.headers.get('authorization') is not None:
            user_id=User_Detail.get_user_id(request);
            print(user_id)  
            data_like=eventUser.objects.filter(user_id=user_id)         
            data=EventDetails.objects.annotate(is_liked=F('eventuser__is_liked'),eventuser_user=F('eventuser__user')).values('is_liked','event_name','date','time','location','image','eventuser__user','id').filter(Q(eventuser__user=user_id)|Q(eventuser__user__isnull=True))
            print(data)
            serializer = EventviewSerializer(data, context={'request': request}, many=True) 
        else:  
            data = EventDetails.objects.all()
            print(data)            
            serializer = EventviewSerializer(data, context={'request': request}, many=True)        
        return Response(serializer.data)  
    def get_myEvent(self,request):
        #To get the events created by login User
        if request.headers.get('authorization') is not None:
            user_id=User_Detail.get_user_id(request);
            print(user_id)           
            data=EventDetails.objects.filter(user=user_id).annotate(is_liked=F('eventuser__is_liked')).values('is_liked','event_name','date','time','location','image').filter(Q(eventuser__user=user_id)|Q(eventuser__user__isnull=True))
            print(data)
            serializer = EventviewSerializer(data, context={'request': request}, many=True) 
        return Response(serializer.data)   
    def patch(self,request):
        #To Update the like status by the User
        user_id=User_Detail.get_user_id(request);        
        request.data.update({'user':user_id})
        print(request.data["EventDetails"])
        eventuser=eventUser.objects.get(Q(EventDetails_id=request.data["EventDetails"])& Q(user_id=user_id))
        serializer = EventUserSerializer(eventuser, data=request.data, partial=True,context={'request': request}) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(status=201, data=serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    def post(self,request):
            #To store the like details for the first time
            user_id=User_Detail.get_user_id(request);
           
            data=request.data
           
            data['user']=user_id
            
            serializer = EventUserSerializer(data=data)
           
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,pk):
        #To get the User already liked that Event or not
        user_id=User_Detail.get_user_id(request);
        data = eventUser.objects.filter(user=user_id,EventDetails_id=pk)

        print(data)    
        serializer = EventUserSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data) 


       
        
