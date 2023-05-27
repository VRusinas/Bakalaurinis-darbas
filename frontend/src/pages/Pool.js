import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import CommentSection from '../components/CommentSection';
import "../styles/global.css";
import "../styles/staticActivities.css";
import "../styles/button.css";

const Pool = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDateHours, setEndDateHours] = useState(2); 
  const [errorMessage, setErrorMessage] = useState(""); 
  useEffect(() => {
    const fetchUserType = async () => {
      const response = await axios.post(`http://localhost:5000/api/protectedUser/id`,{
        email: user.email}, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
      });
      setUserId(response.data.user);
    };
  
    if(user){
      fetchUserType();
    }
  }, [user]);

  if(userId){
    console.log(userId[0]);  
  }

  const handleRegister = async (title) => {
    if(!user){
      setErrorMessage("You must be logged in to register for this activity")
    }
    if(userId){
      try {
        const endDate = new Date(new Date(startDate).getTime() + (endDateHours * 60 * 60 * 1000));
    
        if (endDate.getHours() > 20) {
          setErrorMessage("Please select the hours that do not exceed 8pm");
        }
        else{
        const response = await axios.post('http://localhost:5000/api/registrations/', {
          title: title,
          body: "Pool lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec mi vel ante semper lacinia a a sem.",
          specialistName:"none",
          activityType: "Pool",
          startDate: startDate,
          endDate: endDate,
          specialist_id:"none",
          client_id:userId[0]._id,
          clientName: userId[0].name,
          clientSurname: userId[0].surname,
          clientEmail: user.email,
  
        }, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        console.log(response.data);
        navigate(`/dashboard`);
      }
      } catch (error) {
        console.log(error);
        setErrorMessage("Select the time you want to register")
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  }
  
  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    const selectedHour = new Date(selectedDate).getHours();
    if (selectedHour >= 8 && selectedHour < 20) {
      const formattedDate = selectedDate.slice(0, -3) + ":00";
      setStartDate(formattedDate);
    } else {
      setErrorMessage("Please select a valid time between 8am and 8pm.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  
  const handleEndDateHoursChange = (event) => {
    const hours = parseInt(event.target.value);
    const maxEndTime = new Date(new Date(startDate).getTime() + (8 * 60 * 60 * 1000));
    const endTime = new Date(new Date(startDate).getTime() + (hours * 60 * 60 * 1000));
    if (endTime > maxEndTime) {
      alert("End time cannot exceed 8pm.");
      setEndDateHours(2);
    } else {
      setEndDateHours(hours);
    }
  };
  
  return (
    <div className='pool-main-container'>
        <div className='fade-in main-container'>
      
        <div className='box-container pool-pad'>
            <h1>Swimming</h1>
          <div className='img-container-sauna'>  <img className='dec-img' src='/images/pool.jpg' alt='sports physiotherapy'></img></div>
          <div className='text-container-sauna'>
          <p className='padded-text'> <br/>Swimming in a pool can provide numerous benefits for both 
          physical and mental health. Firstly, swimming is a low-impact exercise that is easy 
          on the joints and can improve cardiovascular health by increasing circulation and 
          strengthening the heart. It also strengthens the muscles, particularly those in the 
          arms, legs, and core, helping to improve overall body strength and flexibility. 
          Swimming is also a great way to burn calories, making it an effective tool for weight 
          management. <br/><br/>Furthermore, swimming has been shown to improve respiratory function,
          reducing the risk of respiratory diseases such as asthma. Additionally, swimming can 
          have positive effects on mental health by reducing stress and anxiety levels, promoting 
          relaxation and improving mood. Finally, swimming can be a social activity, providing 
          an opportunity to connect with others and form meaningful relationships. Overall, 
          swimming in a pool can be a fun and effective way to improve physical and mental 
          health and enhance overall quality of life.</p>
          <br/><h5>Two Hours for pool services cost XX€/h,<br/> four costs XX€/h, <br/>six costs XX€/h.</h5>
          </div>
              <div className='box-choice-container'>
                  <div >
                    <h3 className='sauna-choice-padding'> Choose day and duration:</h3>
                    <input type="datetime-local" value={startDate} onChange={handleStartDateChange} min={new Date().toISOString().slice(0, 16)} step="3600" />
                    <select value={endDateHours} onChange={handleEndDateHoursChange}>
                      <option value={2}>2 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={6}>6 Hours</option>
                    </select>
                    </div>
                    <p className='orange'>{errorMessage}</p>
                    <button className='button sauna-choice-padding' onClick={() => handleRegister("Swimming")}>Register</button>
              </div>
        </div>
        
        </div>
          <div className='comment-section-pool'>
          <CommentSection pageId="pool"/>
          </div>
        </div>
      );
    };

export default Pool