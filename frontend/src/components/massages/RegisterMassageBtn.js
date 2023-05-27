import React, { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/global.css"
import "../../styles/button.css"

const RegisterMassageBtn = () => {

    useEffect(() => {
        localStorage.setItem("eventType", "MassageTherapist");
      }, ["MassageTherapist"]);
    
  return (
    <div>
        <Link to={`/schedules/MassageTherapist`}><button  className='button'>Register</button></Link>
        </div>
  )
}

export default RegisterMassageBtn