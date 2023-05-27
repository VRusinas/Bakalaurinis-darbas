import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/dashboard.css';
import '../styles/button.css';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [registrations, setRegistrations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [showOldRegistrations, setShowOldRegistrations] = useState(false);

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/registrations/myRegistrations',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setRegistrations(res.data.activityRegistration);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchAllRegistrations();
  }, [user]);

  const deleteRegistration = async (_id) => {
    if (!user) {
      console.log('You must be logged in');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/registrations/${_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const newRegistrations = registrations.filter(
        (registration) => registration._id !== _id
      );
      setRegistrations(newRegistrations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortByDate = () => {
    setSortOption('date');
  };

  const handleSortByTitle = () => {
    setSortOption('title');
  };

  const handleToggleShowOldRegistrations = () => {
    setShowOldRegistrations(!showOldRegistrations);
  };

  const sortRegistrations = (registrations) => {
    const filteredRegistrations = registrations.filter((registration) =>
      showOldRegistrations || moment(registration.startDate).isSameOrAfter(moment(), 'day')
    );
  
    if (sortOption === 'date') {
      return filteredRegistrations.sort((a, b) => moment(a.startDate).diff(moment(b.startDate)));
    }
  
    if (sortOption === 'title') {
      return filteredRegistrations.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    return filteredRegistrations;
  };
  
  return (
    <div className="user-dashboard-container">
      <div className="sort-buttons">
        <h2>Your registrations</h2>
        <button className='dashboard-nav-button' onClick={handleSortByDate}>Sort by date</button>
        <button className='dashboard-nav-button' onClick={handleSortByTitle}>Sort by title</button>
        <button className='dashboard-nav-button' onClick={handleToggleShowOldRegistrations}>
          {showOldRegistrations ? 'Hide registration history' : 'Show registration history'}
        </button>
      </div>
      <div className="registrations">
        {isLoading ? (
          <div>Loading...</div>
        ) : registrations ? (
          <div className="grid-user-container">


          {sortRegistrations(registrations).map((registration) => (
            <div key={registration._id} className="grid-user-item">
              <label className='label-user'><h3 className='label-title-user'>Activity:</h3><p>{registration.title}</p></label>
              <label className='label-user'><h3 className='label-title-user'>Description:</h3><p>{registration.body}</p></label>
              {registration.specialistName !== "none" && (
                <label className='label-user'>
                  <h3 className='label-title-user'>Specialist:</h3>
                  <p>{registration.specialistName}</p>
                </label>
              )}
              <label className='label-user'>
                <h3 className='label-title-user'>Start time:</h3>
                <p>{moment(registration.startDate).format('YYYY-MM-DD HH:mm')}</p>
              </label>
              <label className='label-user'>
                <h3 className='label-title-user'>End time:</h3>
                <p>{moment(registration.endDate).format('YYYY-MM-DD HH:mm')}</p>
              </label>
              {moment(registration.startDate).isSameOrAfter(moment(), 'day') && (
                <button className='button' onClick={() => deleteRegistration(registration._id)}>
                  Cancel registration
                </button>
              )}
            </div>
          ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
