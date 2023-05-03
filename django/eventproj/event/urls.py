from django.urls import path
from .views import EventCreateJsonDBView,EventViewJsonDBView
from rest_framework import renderers
event_detail= EventCreateJsonDBView.as_view({
   
    'post': 'post',
   
   
    
} )
event_all_list_detail=EventViewJsonDBView.as_view({
   
    'get': 'get_all',
   
   
    
} 

)
myevent_detail=EventViewJsonDBView.as_view({
   
    'get': 'get_myEvent',
   
   
    
} 

)
like_event=EventViewJsonDBView.as_view({
   
   'patch':'patch',
   'get':'get',
   'post':'post'
   
   
    
} 

)
urlpatterns = [
    
     path('',event_detail),
     path('allevents/',event_all_list_detail),
     path('myevent/',myevent_detail),
     path('likeEvent/',like_event),
      path('likeEvent/<int:pk>',like_event)
     

    # path('<int:pk>',BookJsonDBView.as_view()),

]