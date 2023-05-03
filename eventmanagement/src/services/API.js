import axios from "axios";
import * as url from "../constants/index";
axios.defaults.baseURL=url.API_URL
//To Register
export const registerAPI=(data)=>{
    axios.defaults.headers.common['Authorization'] ="";
    return axios.post(url.REGISTER_API_URL,data)
}
//To Login
export const loginAPI=(data)=>{
    axios.defaults.headers.common['Authorization'] ="";
    return axios.post(url.LOGIN_API_URL,data)
}  
//To Logout
export const logoutAPI=()=>{
    axios.defaults.headers.common['Authorization'] ="";
    return axios.post(url.LOGOUT_API_URL)
}

//To Event Register
export const eventAPI=(data)=>{
    const formData = new FormData(); 
    formData.append('event_name',data.event_name)
    
    formData.append('date',data.date)
    formData.append('time',data.time)
    formData.append('location',data.location)
    if(data.image)
        formData.append('image',data.image,data.image.name)    
    axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
    axios.defaults.headers.common['Content-Type'] ="multipart/form-data"
     return axios.post(url.EVENT_ADD_API_URL,formData)
    }
    export const eventallAPI=()=>{
        
        axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
    
        return axios.get(url.EVENT_ALL_API_URL)
    }
    export const myEventAPI=()=>{
        
        axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
    
        return axios.get(url.MY_EVENT_API_URL)
    }
    export const AddLikeAPI=(data)=>{
        axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
        
         return axios.post(url.EVENT_LIKE_API_URL,data)
        }
        export const UpdateLikeAPI=(data)=>{
            axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
            
             return axios.patch(url.EVENT_LIKE_API_URL,data)
            }
            export const searchdetailsAPI=(data)=>{
                axios.defaults.headers.common['Authorization'] ="Token " + localStorage.getItem('key');
                
                 return axios.get(url.EVENT_LIKE_API_URL+data)
                }
   
        
