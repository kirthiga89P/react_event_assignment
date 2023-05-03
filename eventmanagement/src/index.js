import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './register';
import CreateEvent from './createEvent';
import EventList from './EventList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />       
        <Route path="/Registration" element={<Registration />} />     
        <Route path="/createEvent" element={<CreateEvent />} />  
        <Route path="/EventList" element={<EventList />} />    
        </Routes>
      
      </Router>

      </div>
);


