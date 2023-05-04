from rest_framework import serializers
from .models import EventDetails,eventUser
from drf_extra_fields.fields import Base64ImageField

class url:   
   #To get the image from the media folder
    def get_imageurl(self,EventDetails):
        
        
        request=self.context.get('request')
        
        image=EventDetails.get('image')
        
        #return "request.build_absolute_uri(image_url)"
        return "http://127.0.0.1:8000/"+image 


#Serializer to Create a Event
class EventCreateSerializer(serializers.ModelSerializer,url):
    #To store image in a database
    image=serializers.ImageField()
    
    class Meta:
        
        model=EventDetails
        fields = ('__all__')
#Serailizer to view the Event with the liked details        
class EventviewSerializer(serializers.ModelSerializer,url):
    is_liked=serializers.BooleanField()
    image=serializers.SerializerMethodField("get_imageurl")
    class Meta:
        
        model=EventDetails
        fields = ('id','event_name','date','time','location','is_liked','image')
 #Serializer to view the event liked by User       
class EventUserSerializer(serializers.ModelSerializer,url):   
    
    class Meta:
        
        model=eventUser
        fields = ('__all__')
    
        

