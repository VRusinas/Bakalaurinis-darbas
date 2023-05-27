import React, { useState, useEffect, } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/schedule.css';
import '../styles/global.css'
import { useAuthContext } from "../hooks/useAuthContext";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [activities, setActivities] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const displayDateFormat = 'yyyy-MM-dd HH:mm';
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [registrations, setregistrations] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [eventType, setEventType] = useState(
    localStorage.getItem("eventType") || "Trainer"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("eventType", eventType);
  }, [eventType]);

  useEffect(() => {
    const fetchAllActivities = async () => {
      const res = await axios.get('http://localhost:5000/api/schedules/allActivities');
      setActivities(res.data.activities);
      setLoaded(true);
    };
    
    const fetchUserType = async () => {
      const response = await axios.post(`http://localhost:5000/api/protectedUser/id`,{
      email: user.email}, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
        setUserId(response.data.user);
    };
    
    const fetchAllRegistrations = async () => {
      const res = await axios.get("http://localhost:5000/api/manager/getAllRegistrations", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      setregistrations(res.data.activityRegistrations);
    
      const userRegistrations = res.data.activityRegistrations.filter(registration => registration.clientEmail === user.email);
      setUserRegistrations(userRegistrations);
    };

    fetchAllActivities();
    if(user){fetchUserType();
      fetchAllRegistrations();
    }


   
  }, [user]);
  const events = loaded
    ? activities
        .filter(
            (activity) =>
                activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.specialist.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((activity) => ({
            start: new Date(activity.startDate),
            end: new Date(activity.endDate),
            title: activity.title,
            body: activity.body,
            person: activity.specialist,
            type: activity.activityType,
            specialist_id: activity.user_id,
        }))
    : [];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const EventComponent = ({ event }) => {
    const registrationsCount = registrations
      ? registrations.filter(
          (registration) =>
            registration.title === event.title &&
            registration.specialist_id === event.specialist_id &&
            format(new Date(registration.startDate), displayDateFormat) ===
              format(new Date(event.start), displayDateFormat) &&
            format(new Date(registration.endDate), displayDateFormat) ===
              format(new Date(event.end), displayDateFormat)
        ).length: 0;
  
    let limit;
    if (event.type === 'Trainer') {
      limit = 15;
    } else if (event.type === 'MassageTherapist') {
      limit = 1;
    } else if (event.type === 'Physiotherapist') {
      limit = 1;
    }
  
    const availableSlots = limit - registrationsCount;
    const displaySlots = availableSlots > 0 ? availableSlots : 'Full';
  
    return (
      <div onClick={() => setIsModalOpen(true)} className='calendar-unit'>
        <p>{event.person}</p>
        <p>{event.title}</p>
        <p>Available slots: {displaySlots}</p>
      </div>
    );
  };
  
  

  const eventsFormatted = events.map((event) => ({
    ...event,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
  }));

  const handleNavigate = () => {
    const isAlreadyRegistered = userRegistrations.some(
      (registration) =>
        registration.title === selectedEvent.title &&
        registration.specialist_id === selectedEvent.specialist_id &&
        format(new Date(registration.startDate), displayDateFormat) ===
          format(new Date(selectedEvent.start), displayDateFormat) &&
        format(new Date(registration.endDate), displayDateFormat) ===
          format(new Date(selectedEvent.end), displayDateFormat)
    );
  
    if (isAlreadyRegistered) {
      setError("You are already registered for this activity.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
  
    let limit;
    if (selectedEvent.type === "Trainer") {
      limit = 15;
    } else if (
      selectedEvent.type === "MassageTherapist" ||
      selectedEvent.type === "Physiotherapist"
    ) {
      limit = 1;
    }
  
    const registrationsCount = registrations
      ? registrations.filter(
          (registration) =>
            registration.title === selectedEvent.title &&
            registration.specialist_id === selectedEvent.specialist_id &&
            format(new Date(registration.startDate), displayDateFormat) ===
              format(new Date(selectedEvent.start), displayDateFormat) &&
            format(new Date(registration.endDate), displayDateFormat) ===
              format(new Date(selectedEvent.end), displayDateFormat)
        ).length
      : 0;
  
    if (registrationsCount >= limit) {
      setError("Registration limit reached for this activity.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
  
    const data = {
      title: selectedEvent.title,
      body: selectedEvent.body,
      specialistName: selectedEvent.person,
      activityType: selectedEvent.type,
      startDate: selectedEvent.start,
      endDate: selectedEvent.end,
      specialist_id: selectedEvent.specialist_id,
      clientName: userId[0].name,
      clientSurname: userId[0].surname,
      clientEmail: userId[0].email,
    };
  
    axios
      .post("http://localhost:5000/api/registrations/", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/dashboard`);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleEventTypeClick = (event) => {
    const eventTypeValue = event.target.value;
    setEventType(eventTypeValue);
    navigate(`/schedules/${eventTypeValue}`);
  };

  const filteredEvents = eventsFormatted.filter(
    (event) => event.type === eventType
  );

  return (
    <div className='shcedule-container fade-in'>
         <div className='shcedule-nav'>
            <div>
            <h1>{eventType} schedule</h1>
                      <input
                      className='shcedule-nav-filter'
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                      <button className='shcedule-nav-button' onClick={handleEventTypeClick} value="Trainer">Trainer</button>
                      <button className='shcedule-nav-button' onClick={handleEventTypeClick} value="MassageTherapist">Massage Therapist</button>
                      <button className='shcedule-nav-button' onClick={handleEventTypeClick} value="Physiotherapist">Physiotherapist</button>
            </div>        
          </div>
          <div className='shcedule-box'>

          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            views={['day', 'week', 'month']}
            step={30}
            defaultView="month"
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => ({
              className: 'custom-event-class',
            })}
            components={{
              event: EventComponent,
            }}
            style={{
              width: '88vw',
              height: '100vh',
              fontSize: '16px',
              lineHeight: '2',
            }}
            dayLayoutAlgorithm={'no-overlap'}
            min={new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              8,
              0
            )}
            max={new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              23,
              0
            )}
            formats={{
              timeGutterFormat: (date, culture, localizer) =>
                localizer.format(date, 'HH:mm', culture),
            }}
            />
              {isModalOpen &&  (
                <div className="modal-overlay-schedule">
                  <div className="modal-schedule ">
                    <div className="modal-content-schedule">
                    {selectedEvent &&(
                      <div className='modal-text-schedule'>
                            <div className='modal-button-close-container '><button className='modal-button-close' onClick={() => setIsModalOpen(false)}> Close </button></div>
                              <h3 className='modal-text-pad'>Title: {selectedEvent.title}</h3>
                              <p className='modal-text-pad'>
                                <strong>Specialist name:</strong> {selectedEvent.person}
                              </p>
                              <p className='modal-text-pad'>
                                <strong>Specialist ocupation:</strong> {selectedEvent.type}
                              </p>
                              <p className='modal-text-pad'>
                                <strong>Short description:</strong> {selectedEvent.body}
                              </p>
                              <p className='modal-text-pad'> 
                                <strong>Starts:</strong>{' '}
                                {format(new Date(selectedEvent.start), displayDateFormat)}
                              </p>
                              <p className='modal-text-pad'> 
                                <strong>Ends:</strong>{' '}
                                {format(new Date(selectedEvent.end), displayDateFormat)}
                              </p>
                              <div>
                              <p className='orange'>{error}</p>
                              {!userId && <p className="orange">You must be logged in to register</p>}
                              {userId &&
                          (userId[0].userType !== "SPECIALIST" &&
                            userId[0].userType !== "MANAGER" &&
                            selectedEvent.start >= new Date(new Date().setHours(0, 0, 0, 0))) && (
                            <button onClick={handleNavigate} className="font-resize modal-button-choice">
                              Register
                            </button>
                          )}
                              {selectedEvent.type === 'MassageTherapist' && (
                              <button className='font-resize modal-button-choice'>
                                <Link className='modal-link' to={`/specialists/${selectedEvent.person}`}>About specialist</Link>
                              </button>
                              )}
                              {selectedEvent.type === 'Physiotherapist' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/specialists/${selectedEvent.person}`}>About specialist</Link>
                                </button>
                              )}
                              {selectedEvent.type === 'Trainer' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/specialists/${selectedEvent.person}`}>About specialist</Link>
                                </button>
                              )}

                              {selectedEvent.title === 'Mobility training' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/training/mobilityTraining`}>About mobility training</Link>
                                </button>
                              )}
                                {selectedEvent.title === 'Yoga' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/training/yoga`}>About yoga</Link>
                                </button>
                              )}    
                              {selectedEvent.title === 'Flexibility training' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/training/flexibilityTraining`}>About flexibility training</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Weight training' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/training/weightTraining`}>About weight training</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Aerobics' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/training/aerobics`}>About Aerobics</Link>
                                </button>
                              )}

                              {selectedEvent.title === 'Sports massage' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/massages/sports`}>About Sports masssage</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Deep tissue massage' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/massages/deepTissue`}>About Deep tissue massage</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Pressure point massage' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/massages/pressurePoint`}>About Pressure point massage</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Hot stone massage' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/massages/hotStone`}>About Hot stone massage</Link>
                                </button>
                              )}
                              {selectedEvent.title === 'Lymphatic drainage massage' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/massages/lymphaticDrainage`}>About Lymphatic drainage massage</Link>
                                </button>
                              )}

                              {selectedEvent.title === 'Dry needle physiotherapy' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/physiotherapy/dryNeedling`}>About dry needle physiotherapy</Link>
                                </button>
                              )}
                                  {selectedEvent.title === 'Sports physiotherapy' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/physiotherapy/sportsPhysiotherapy`}>About sports physiotherapy</Link>
                                </button>
                              )}
                                      {selectedEvent.title === 'Orthopedic physiotherapy' && (
                                <button className='font-resize modal-button-choice'>
                                  <Link className='modal-link' to={`/physiotherapy/orthopedicPhysiotherapy`}>About orthopedic physiotherapy</Link>
                                </button>
                              )}
                        </div>
                        </div>
                      )}
                    </div>
                
                  </div>
                </div>
                  )}
         </div>
        <div >
      </div>
    </div>
  );
};


export default CalendarComponent;
