import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/grid.css';

const UserRegistrations = () => {
  const { user } = useAuthContext();
  const [registrations, setRegistrations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [titleFilter, setTitleFilter] = useState(null);
  const [sortByDate, setSortByDate] = useState(false);
  const [showAllRegistrations, setShowAllRegistrations] = useState(false);
  const [showOlderRegistrations, setShowOlderRegistrations] = useState(false);

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/registrations/userRegistrations',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setRegistrations(res.data.activityRegistrations);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchAllRegistrations();
  }, [user]);

  const filteredRegistrations = registrations && registrations.filter((registration) => {
    if (!showAllRegistrations && moment(registration.startDate).isBefore(moment().startOf('day'))) {
      return false;
    }
    if (startDateFilter && moment(registration.startDate).isBefore(startDateFilter)) {
      return false;
    }
    if (titleFilter && !registration.title.toLowerCase().includes(titleFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

const sortedRegistrations = sortByDate
  ? filteredRegistrations && filteredRegistrations.sort((a, b) => moment(b.startDate).diff(moment(a.startDate)))
  : filteredRegistrations;

  const groupedRegistrations = sortedRegistrations && sortedRegistrations.reduce((acc, curr) => {
    if (acc[curr.title]) {
      acc[curr.title].push(curr);
    } else {
      acc[curr.title] = [curr];
    }
    return acc;
  }, {});

  const registrationGroups = groupedRegistrations
    ? Object.keys(groupedRegistrations).map((title) => {
        const registrationsByTitle = groupedRegistrations[title];
        const sortedRegistrationsByTitle = registrationsByTitle.sort((a, b) =>
          moment(a.startDate).diff(moment(b.startDate))
        );

        const groupedRegistrationsByDate = sortedRegistrationsByTitle.reduce((acc, curr) => {
          const date = moment(curr.startDate).format('YYYY-MM-DD');
          const timeRange = `${moment(curr.startDate).format('HH:mm')} - ${moment(curr.endDate).format('HH:mm')}`;
          if (acc[date]) {
            if (acc[date][timeRange]) {
              acc[date][timeRange].push(curr);
            } else {
              acc[date][timeRange] = [curr];
            }
          } else {
            acc[date] = { [timeRange]: [curr] };
          }
          return acc;
        }, {});

        const registrationComponents = Object.keys(groupedRegistrationsByDate).map((date) => {
          const timeRanges = Object.keys(groupedRegistrationsByDate[date]);
          const isOlderDate = moment(date).isBefore(moment().format('YYYY-MM-DD'));
          const dateStyle = isOlderDate ? { color: 'red' } : {};
          const textStyle = isOlderDate ? { color: 'grey' } : {};
        
          return (
            <div className='date-box' key={date}>

              <h3 style={dateStyle}>{date}</h3>
              {timeRanges.map((timeRange) => (
                <div className='time-box' key={timeRange}>
                  
                  <h5 className='time-pad' style={textStyle}>{timeRange}</h5>
                  {groupedRegistrationsByDate[date][timeRange].map((registration) => (
                    <React.Fragment key={registration.id}>

                      <div className='time-box-text'>
                      <p style={textStyle}>Client: {registration.clientName} {registration.clientSurname}</p>
                      <p style={textStyle}>Clients email: {registration.clientEmail}</p>
                      </div>
                   
                 
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          );
        });
        

        return (
          <div className="grid-box-dashboard" key={title}>
            <h2>{title}</h2>
            <br />
            {registrationComponents}
          </div>
        );
      })
    : null;

  const handleShowAllRegistrations = () => {
    setShowAllRegistrations(true);
    setShowOlderRegistrations(false);
  };

  const handleShowOlderRegistrations = () => {
    setShowOlderRegistrations(true);
    setShowAllRegistrations(false);
  };

  return (
    <div className="App">
      <br />
      <div className="reg-box">
        <br />
        <h2>Users that are registered to your activities:</h2>
        <br />
        <h2>Filter registrations:</h2>
        <div>
          <label>Filter by Start Date: </label>
          <input type="date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
        </div>
        <div>
          <label>Filter by Title: </label>
          <input type="text" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
        </div>
        <label>Sort dates by: </label>
        {!showAllRegistrations && !showOlderRegistrations && (
          <button onClick={handleShowAllRegistrations}>Show older registrations</button>
        )}
        {showAllRegistrations && !showOlderRegistrations && (
          <button onClick={handleShowOlderRegistrations}>Hide older registrations</button>
        )}
        {showOlderRegistrations && (
          <button onClick={handleShowAllRegistrations}>Show older registrations</button>
        )}
        <div className="grid-container-dashboard">
          {isLoading ? <div>Loading...</div> : registrationGroups}
        </div>
      </div>
    </div>
  );
};

export default UserRegistrations;
