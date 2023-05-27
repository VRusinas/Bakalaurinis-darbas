import React, { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/button.css"
import "../../styles/button.css"

const RegisterPhysioBtn = () => {

    useEffect(() => {
        localStorage.setItem("eventType", "Physiotherapist");
      }, ["Physiotherapist"]);
    
  return (
    <div className='fade-in'>
        <Link to={`/schedules/Physiotherapist`}><button className='button'>Register</button></Link>
        </div>
  )
}
export default RegisterPhysioBtn