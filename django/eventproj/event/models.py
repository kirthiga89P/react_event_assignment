from django.db import models
import datetime
from userDetail.models import user
from django.utils.translation import gettext_lazy as _
# Create your models here.

  
class EventDetails(models.Model):
    event_name=models.CharField(max_length=500,null=False) 
    user=models.ForeignKey(user,null=False,on_delete=models.CASCADE)
    date=models.DateField(("Date"), default=datetime.date.today,null=False)
    location=models.CharField(max_length=500,null=False) 
    time=models.CharField(max_length=250,null=False)    
    image=models.ImageField(upload_to='images/',null=False)      


class eventUser(models.Model):    
    EventDetails = models.ForeignKey(EventDetails,on_delete=models.CASCADE,blank=False)
    user=models.ForeignKey(user,null=False,on_delete=models.CASCADE)   
    is_liked=models.BooleanField(default=False)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['EventDetails', 'user'], name='EventUser'),
        ]
