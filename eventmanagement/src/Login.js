import './index.css';
import login from './images/login.jpg'
import { loginAPI } from './services/API';
import Header from './Header';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from 'react';
import { storeToken } from './services/auth';

const Login=()=>{
    const initialData={
        email:"",
        password:""
      }
      const [loginData,setLogin]=useState(initialData)
      const onChange = (e)=> {       
        setLogin(previousState => {
            let value=e.target.value;          
          
            return { ...previousState,[e.target.name]: value }
          });        
      }; 
      const loginbtn=()=>{
        loginAPI(loginData).then((response)=>{            
            storeToken(response.data.key);
            setLogin(initialData);
            alert("Login Successfull")}).catch((err)=>{
    
        if(err.response.data.non_field_errors=="Unable to log in with provided credentials.")
          alert("Invalid Credentials");
    
    })
    }
    return(
        <div>
            <div>
           <Header/>
        </div>
        <div className="login">
        <h3>Login </h3>
        <Form>
        <input type="email" name="email"   onChange={onChange} value={loginData.email} placeholder="Email Address" required style={{width:'300px',height:'30px'}}></input><br>
        </br><br></br>
        <input type="password" name="password"   onChange={onChange} value={loginData.password} placeholder="Password" required style={{width:'300px',height:'30px'}}></input><br></br><br></br>
        <Button className="loginbutton" onClick={loginbtn}>Next</Button>
        </Form>
        </div>
        <div className='loginimg'>
            <img src={login}></img>
        </div>
        </div>
    )
}
export default Login;