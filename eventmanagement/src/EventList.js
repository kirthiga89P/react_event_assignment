

import Header from './Header';
import { AddLikeAPI, eventallAPI, searchdetailsAPI,UpdateLikeAPI, myEventAPI } from './services/API';
import { isAuthenticated } from './services/auth'
import { useState,useEffect } from 'react';
import { FaStar } from "react-icons/fa";



function EventList(){
    const initialEventValue = [{
        id:"",
        event_name:"",
        date:"",
        time:"",
        location:"",
        image:"",
        is_liked:false
     }]
     const [Eventdata, setEventData] = useState(initialEventValue)  
     useEffect(()=>{   
        
       
        eventallAPI().then((res) => {
           
            setEventData(res.data)   
                    
           
        }).catch((error) => {
           alert(error.repsonse.data)

        });          
                   
     
},[])
     const allEvent=(e)=>{
        e.preventDefault();     
       
        eventallAPI().then((res) => {
            
            setEventData(res.data) 
                    
           
        }).catch((error) => {
           alert(error.repsonse.data)

        });
     }
     const myEvent=(e)=>{
        e.preventDefault();     

        myEventAPI().then((res) => {
            setEventData(res.data)            
           
        }).catch((error) => {
           alert(error.repsonse.data)

        });
     }
     const likeEvent=(data,e)=>{
        e.target.style.color=="red"?e.target.style.color="lightgray":e.target.style.color="red";
        searchdetailsAPI(data.id).then((res)=>{
            if(res.data.length!=0)  
            {
            let updateData={               
                EventDetails:res.data[0].EventDetails,
                is_liked:res.data[0].is_liked,
                user:res.data[0].user}
            
           
            
        
        if(updateData.EventDetails!="")
       
            (updateData.is_liked==true) ?  updateData.is_liked=false:updateData.is_liked=true   
         
         UpdateLikeAPI(updateData).then((res)=>{
            
             
         }) 
        }
        else{
            let addData={               
                EventDetails:data.id,
                is_liked:true,
                user:""}
            
           
            
         AddLikeAPI(addData).then((res)=>{
             
         })
        }
    })
}
     
        
 
 const rows=Eventdata.map((data,index)=>{
    return(<tr key={index}>
       <td>
               {console.log(data.id)}
            
               <img src={data.image}style={{height:100}}/>
               </td> 
                <td style={{marginTop:-600}}><label>{data.event_name}</label><br></br>
                <label>{data.date}</label>&nbsp;
                <label>{data.time}</label><br></br>
                <label>{data.location}</label><br></br>  
                <FaStar 
     color={data.is_liked ? "red" : "lightgray"} 
    
     onClick={(e)=>{likeEvent(data,e)}} /></td>
 
     
    </tr>)
  })
   


 return(
<div>
    <div>
        <Header/>
       </div> 

       
        <div >            
            <ul>
          
                <li>
                 <button onClick={allEvent}>All Events</button>
            </li>

{isAuthenticated() &&
            <li>
                <button onClick={myEvent}>My Events</button>
                </li>}
            </ul>
         </div>
         <div style={{marginTop:-350}}>
         <div className='eventview' >
           
            <div ><br></br>
                          
              {rows}  
              
        </div>


        
    
         
   </div>
   </div>
   </div>)
}

export default EventList; 