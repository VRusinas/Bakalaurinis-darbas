import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import CommentSection from '../components/CommentSection';
import "../styles/global.css";
import "../styles/staticActivities.css";
import "../styles/button.css";

const Saunas = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
        else{
        const response = await axios.post('http://localhost:5000/api/registrations/', {
          title: title,
          body: "Sauna lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec mi vel ante semper lacinia a a sem.",
          specialistName:"none",
          activityType: "Sauna",
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
      setEndDateHours(2);
    } else {
      setEndDateHours(hours);
    }
  };
  
  return (
    <div className='main-container-1'>
    <div className='fade-in main-container'>
      <div className='box-container'>
        
        <h1>Traditional sauna</h1>
       <div className='img-container-sauna'>  <img className='dec-img' src='/images/traditional sauna.jpg' alt='Traditional sauna'></img></div>
       <div className='text-container-sauna'>
       <p className='padded-text'>Traditional sauna, also known as Finnish sauna, offers several benefits
        for both physical and mental health. The high temperature of the sauna can
        cause the body to sweat profusely, which helps to flush out toxins from
        the body and improve overall circulation. Regular sauna use has been shown
        to have a positive impact on cardiovascular health, lowering blood pressure
        and reducing the risk of heart disease. 
        <br/> <br/>Additionally, the heat and relaxation
        induced by the sauna can help to relieve muscle tension and promote a sense of
        calmness and relaxation. The traditional sauna experience can also be social,
        providing an opportunity for individuals to connect with friends and family while
        improving their health. Overall, the regular use of traditional sauna can contribute
        to improved physical and mental wellbeing.</p>
        <br/><h5>Two Hours for traditional sauna cost XX€/h,<br/> four costs XX€/h, <br/>six costs XX€/h.</h5>
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
                <br/><p className='orange'>{errorMessage}</p>
                <button className='button sauna-choice-padding' onClick={() => handleRegister("Traditional sauna")}>Traditional Sauna</button>
          </div>
    </div>

    <div className='box-container'>
        
        <h1>Dry sauna</h1>
       <div className='img-container-sauna'>  <img className='dec-img' src='/images/dry sauna.jpg' alt='Dry sauna'></img></div>
       <div className='text-container-sauna'>
       <p className='padded-text'>Dry sauna, also known as Finnish sauna, involves 
       sitting in a heated room typically ranging from 160 to 200°F for a period of 
       time. The dry heat causes the body to sweat, which has numerous health benefits. 
       One of the primary benefits of dry sauna is detoxification, as sweating helps to 
       flush out toxins and impurities from the body. This can help to improve skin health, 
       reduce inflammation, and enhance immune function. <br/><br/> Additionally, regular dry sauna use 
       has been shown to help lower blood pressure, improve cardiovascular function, 
       and even aid in weight loss by increasing metabolism. The heat from the sauna 
       can also help to relax muscles and alleviate pain, making it a great option for 
       those with chronic pain or muscle tension. Overall, dry sauna is a safe and 
       effective way to improve overall health and wellbeing, and is enjoyed by many 
       people worldwide.</p>
       <br/><h5>Two Hours for dry sauna cost XX€/h,<br/> four costs XX€/h, <br/>six costs XX€/h.</h5>
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
                <br/><p className='orange'>{errorMessage}</p>
                <button className='button sauna-choice-padding' onClick={() => handleRegister("Dry sauna")}>Dry Sauna</button>
          </div>
    </div>

    <div className='box-container'>
        <h1>Smoke bath</h1>
       <div className='img-container-sauna'>  <img className='dec-img' src='/images/smoke bath.jpg' alt='smoke bath'></img></div>
       <div className='text-container-sauna'>
       <p className='padded-text'>A smoke bath, also known as a smudging ritual, 
       involves burning specific herbs or plants and using the smoke to cleanse 
       and purify a space or person. This practice has been used for centuries in
        various cultures around the world and is believed to have several benefits. 
        Firstly, the smoke is thought to clear negative energy and purify the air, 
        which can have a calming effect on the mind and body. It may also have 
        antibacterial and antiviral properties, which can help to reduce the spread 
        of germs and illness. <br/><br/> Additionally, the practice of smudging can help to 
        promote relaxation and reduce stress and anxiety. Finally, some practitioners 
        believe that smoke baths can help to connect them to spiritual energies or 
        entities and facilitate spiritual growth and development. Overall, a 
        smoke bath can be a powerful tool for promoting physical, mental, and 
        spiritual well-being.</p>
        <br/><h5>Two Hours for smoke bath cost XX€/h,<br/> four costs XX€/h, <br/>six costs XX€/h.</h5>
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
                <br/><p className='orange'>{errorMessage}</p>
                <button className='button sauna-choice-padding' onClick={() => handleRegister("Smoke bath")}>Smoke Bath</button>
          </div>
    </div>

    <div className='box-container'>
        <h1>Infrared Therapy Sauna</h1>
       <div className='img-container-sauna'>  <img className='dec-img' src='/images/infra.jpeg' alt=' Infrared therapy sauna'></img></div>
       <div className='text-container-sauna'>
       <p className='padded-text'>
        Infrared therapy saunas use infrared light to produce heat, 
        which can have several benefits for the body. Firstly, the heat 
        generated by the sauna can help to relax muscles and relieve tension, 
        which can be beneficial for those who suffer from chronic pain or 
        muscle soreness.<br/><br/>Additionally, the infrared light can penetrate deeper 
        into the skin than traditional saunas, which can promote detoxification 
        and increase circulation, helping to remove toxins from the body. 
        This can also have a positive impact on the immune system, improving 
        overall health and wellness. Infrared therapy saunas have also been 
        shown to improve skin health, reducing the appearance of wrinkles 
        and improving skin tone and texture. Finally, the heat generated 
        by the sauna can help to reduce stress and promote relaxation, 
        which can have a positive impact on mental health and overall 
        well-being. Overall, infrared therapy saunas can be a powerful 
        tool for promoting physical and mental health and improving 
        overall quality of life.</p>
        <br/><h5>Two Hours for infrared therapy saunas cost XX€/h,<br/> four costs XX€/h, <br/>six costs XX€/h.</h5>
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
                <br/><p className='orange'>{errorMessage}</p>
                <button className='button sauna-choice-padding' onClick={() => handleRegister("Infrared therapy sauna")}>Infrared Therapy Sauna</button>
          </div>
    </div>

      
    </div>
    <div className='comment-section-right'>
      <CommentSection pageId="saunas"/>
      </div>
    </div>
  );
};

export default Saunas;
