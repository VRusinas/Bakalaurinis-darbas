import React, { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/button.css"

const RegisterTrainingBtn = () => {
  useEffect(() => {
    localStorage.setItem("eventType", "Trainer");
  }, ["Trainer"]);
  return (
    <div>
        <Link to={`/schedules/Trainer`}><button className='button'>Register</button></Link>
    </div>
  )
}

export default RegisterTrainingBtn