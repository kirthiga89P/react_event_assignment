from rest_framework import serializers
from .models import EventDetails,eventUser
from drf_extra_fields.fields import Base64ImageField

class url:   

    def get_imageurl(self,EventDetails):
        
        
        request=self.context.get('request')
        
        image=EventDetails.get('image')
        
        #return "request.build_absolute_uri(image_url)"
        return "http://127.0.0.1:8000/"+image 



class EventCreateSerializer(serializers.ModelSerializer,url):
    image=serializers.ImageField()
    
    class Meta:
        
        model=EventDetails
        fields = ('__all__')
class EventviewSerializer(serializers.ModelSerializer,url):
    is_liked=serializers.BooleanField()
    image=serializers.SerializerMethodField("get_imageurl")
    class Meta:
        
        model=EventDetails
        fields = ('id','event_name','date','time','location','is_liked','image')
class EventUserSerializer(serializers.ModelSerializer,url):   
    
    class Meta:
        
        model=eventUser
        fields = ('__all__')
    
        

