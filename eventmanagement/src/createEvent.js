import {  useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { eventAPI } from './services/API';
import Register from './images/Register.jpg'
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Header from './Header';

function CreateEvent() {
   
    const initialEventValue = {
       event_name:"",
       date:"",
       time:"",
       location:"",
       image:""
    }
    const [Eventdata, setEventData] = useState(initialEventValue)
    
    const onChange = (e) => {
        //alert(new Date())
        setEventData(previousState => {
            let value = e.target.value;

            return { ...previousState, [e.target.name]: value }
        });
    };
    const onHandleImageChange=(e)=>{
        let newData={...Eventdata}
        newData.image=e.target.files[0];
        setEventData(newData)
       
  
      }
      


    const createEvent = e => {

        e.preventDefault();
      

        eventAPI(Eventdata).then(() => {
            setEventData({ ...initialEventValue })            
            alert("Event Added Successfully")
        }).catch((error) => {
           alert(error.response.data)

        });
    }
    // 

    if(!isAuthenticated())
    return <Navigate to="..\"/>


    return (
        <div>
            <Header />
            <div className='register'>

                <Form onSubmit={createEvent}>
                    
                        <div>

                            <Label htmlFor="Memberegister" style={{ fontSize: 25,color:"Blue"}}>

                         <b>Register Event Here</b>

                            </Label>

                        </div>
                        <br /><br />
                        <FormGroup>
                        <Input

                            type="text"
                            name="event_name"
                            value={Eventdata.event_name}
                            onChange={onChange}
                            required
                            placeholder="Enter Event Name"
                            className="textboxstyle"

                        />
</FormGroup>
                       
                        <br></br>
                        <FormGroup>
                        <Input

                            type="text"
                            name="location"
                            value={Eventdata.location}
                            onChange={onChange}
                            required
                            placeholder="Enter Location"
                            className="textboxstyle"

                        />
</FormGroup>
                       
                        <br></br>
                        <FormGroup>
                        <Input

                            type="date"
                            name="date"
                            value={Eventdata.date}
                            min={new Date().toISOString().slice(0, -8).split('T')[0]}
                            onChange={onChange}
                            placeholder="Enter Date of Event"
                            required
                            className="textboxstyle"
                        />
                    </FormGroup>
                    <br></br>
                    <FormGroup >

                        <Input
                            type="time"
                            name="time"
                            value={Eventdata.time}
                            placeholder="Enter time of Event"
                            min={new Date().toISOString().slice(0, -8).split('T')[1]}
                            onChange={onChange}
                            required
                            className="textboxstyle"
                        />
                       
                    </FormGroup>
                    <br></br>
                    <FormGroup >

                        <Input
                            type={"file"}
                            name="image"
                            
                            accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
                            onChange={(e)=>{onHandleImageChange(e)}}  
                            
                            required
                        />
                     
                    </FormGroup>

                    <br></br>
                        <Button className="buttonRegister">Confirm Event</Button>

                   
                    <br></br>
                    
                </Form>
            </div>
            <div style={{marginLeft:'900px',marginTop:'-300px'}}>
            <img src={Register}></img>
        </div>
        </div>

    );
}


export default CreateEvent;