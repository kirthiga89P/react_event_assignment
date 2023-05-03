
import { Link} from "react-router-dom"
import Logo from './images/Logo.png'
import { isAuthenticated, logout } from './services/auth';
import { logoutAPI } from './services/API';
import {useState} from 'react'


function Header(){
 const [loading,setLoading]=useState(false)
 //const navigate=useNavigate()
 const logoutuser=()=>{

 setTimeout(()=>{
  logoutAPI().then(()=>{
  logout()
  alert("Logout sucessfully")
  //navigate('/login')
  setLoading(true)
  });
},1000)
 
}
    return(
      <div>
       <div >
      <img  src={Logo} />
      </div>
      <div className='header'>          
          
         
          
     <nav>
      <ul>  
     
      <li>
          <Link  style={{textDecoration: 'none',color:'White',marginLeft:200}} to="/EventList">EventList</Link>
        </li>
        <li>
          <Link  style={{textDecoration: 'none',color:'White',marginLeft:200}} to="/createEvent">Create a Event</Link>
        </li>
         
        {!isAuthenticated() &&        
        <li>
          <Link  style={{textDecoration: 'none',color:'White',marginLeft:200}} to="/Registration">Register</Link>
        </li>
        }
      
        {!isAuthenticated() &&
        <li>
          <Link  style={{textDecoration: 'none',color:'White',marginLeft:500}} to="/">Login</Link>
        </li>
        }
        {isAuthenticated() && <li>
          <a style={{textDecoration: 'none',color:'black',cursor:'pointer',marginLeft:300}} onClick={logoutuser} disabled={loading}>Logout</a>
        </li>
        }
        
      </ul>
    </nav>
   
   
    
      </div>
     
     
      </div>

  
    )
    
}
export default Header;
