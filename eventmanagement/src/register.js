import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { registerAPI } from './services/API';
import Register from './images/Register.jpg'

import Header from './Header';

function Registration() {
    const initialError = {
       
        email: "",
        password: "",

    }
    const initialMemberValue = {
        id: "",
        email: "",
        first_name: "",
        password1: "",
        password2: "",


    }
    const [Memberdata, setMemberData] = useState(initialMemberValue)
    const [errors, setErrormsg] = useState(initialError)

    const onChange = (e) => {

        setMemberData(previousState => {
            let value = e.target.value;

            return { ...previousState, [e.target.name]: value }
        });
    };


    const createMember = e => {

        e.preventDefault();
        let errormsg = initialError

        registerAPI(Memberdata).then(() => {
            setMemberData({ ...initialMemberValue })
            setErrormsg({ ...initialError })
            alert("Registered Successfully")
        }).catch((error) => {
            for (var err in error.response.data) {

                if (err == "email") {

                    if (error.response.data.email[0] == "A user is already registered with this e-mail address.") {
                        errormsg.email = "Email id has been already Registered.."
                                        }
                }
                if (err == "password1") {

                    if (error.response.data.password1[0] == "This password is too short. It must contain at least 8 characters." ||
                        error.response.data.password1[0] == "This password is entirely numeric.") {

                        errormsg.password = "Password should more than 8 characters and should contain atleast one alphabet"

                    }
                    if (error.response.data.password1[0] == "This password is too common.") {

                        errormsg.password = "This password is too common."

                    }
                }
                if (err == "non_field_errors") {
                    if (error.response.data.non_field_errors == "The two password fields didn't match.")
                        errormsg.password = "Password and confirm Password didnt march"


                }
            }


            setErrormsg({ ...errormsg })

        });
    }
    // 




    return (
        <div>
            <Header />
            <div className='register'>

                <Form onSubmit={createMember}>
                    
                        <div>

                            <Label htmlFor="Memberegister" style={{ fontSize: 25,color:"Blue"}}>

                         <b>Register Here</b>

                            </Label>

                        </div>
                        <br /><br />
                        <FormGroup>
                        <Input

                            type="email"
                            name="email"
                            value={Memberdata.email}
                            onChange={onChange}
                            required
                            placeholder="Email"
                            className="textboxstyle"

                        />
</FormGroup>
                        {errors.email != null && <Label className='error' htmlFor="emailerr">{errors.email}</Label>}
                        <br></br>
                        <FormGroup>
                        <Input

                            type="text"
                            name="first_name"
                            value={Memberdata.first_name}
                            onChange={onChange}
                            placeholder="Name"
                            required
                            className="textboxstyle"
                        />
                    </FormGroup>
                    <br></br>
                    <FormGroup >

                        <Input
                            type="password"
                            name="password1"
                            value={Memberdata.password1}
                            placeholder="Password"
                            onChange={onChange}
                            required
                            className="textboxstyle"
                        />
                        {errors.password != null && <Label className='error' htmlFor="pwderr">{errors.password}</Label>}
                    </FormGroup>
                    <br></br>
                    <FormGroup >

                        <Input
                            type="password"
                            name="password2"
                            value={Memberdata.password2}
                            placeholder="Confirm Password"
                            onChange={onChange}
                            required
                            className="textboxstyle"
                        />
                        {errors.password != null && <Label className='error' htmlFor="pwderr">{errors.password}</Label>}
                    </FormGroup>

                    <br></br>
                        <Button className="buttonRegister">Register</Button>

                   
                    <br></br>
                    
                </Form>
            </div>
            <div style={{marginLeft:'900px',marginTop:'-300px'}}>
            <img src={Register}></img>
        </div>
        </div>

    );
}


export default Registration;