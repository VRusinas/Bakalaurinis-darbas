import { useState, useEffect, } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Home from "../pages/Home";
import UserRegistrations from "./UserRegistrations";
import { useNavigate } from "react-router-dom";
import DataDashboard from "../pages/DataDashboard";
import moment from 'moment';
import "../styles/global.css";
import"../styles/activities.css";

const Activities = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [activities, setactivities] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
    specialist: "",
    activityType: "",
    startDate: "",
    endDate: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
    specialist: "",
    activityType: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
      fetchActivities();
      fetchUserType();
  }, []);
  
  const fetchActivities = async () => {
    const res = await axios.get("http://localhost:5000/api/activities", {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    setactivities(res.data.activities);
  };
  

  const fetchUserType = async () => {
    const response = await axios.post(`http://localhost:5000/api/protectedUser/id`,{
    email: user.email}, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
   
    });
    const json = JSON.stringify(response.data.user[0]);
      setUserId(response.data.user[0]);
  };

  const updateCreateFormField = async (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm, 
      [name]: value,
    });
   
  };

  const createActivity = async (e) => {
    e.preventDefault();
  
    if (!user) {
      console.log("You must be logged in");
      return;
    }
  
    if (
      !createForm.title ||
      !createForm.body ||
      !createForm.specialist ||
      !createForm.activityType ||
      !createForm.startDate ||
      !createForm.endDate
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    else{
      setErrorMessage("");
    }
  
    const res = await axios.post(
      "http://localhost:5000/api/activities",
      createForm,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setactivities([...activities, res.data.activity]);
  
    setCreateForm({
      title: "",
      body: "",
      specialist: "",
      activityType: "",
      startDate: "",
      endDate: "",
    });
  };
  
  const handleUpdateFieldChange = async (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = async (activity) => {
    setUpdateForm({
      _id: activity._id,
      title: activity.title,
      body: activity.body,
      specialist: activity.specialist,
      activityType: activity.activityType,
      startDate: activity.startDate,
      endDate: activity.endDate,
    });
  };

  const deleteActivity = async (_id) => {

     if(!user){
      console.log("You must be logged in")
      return;
    }
    
    const res = await axios.delete(
      `http://localhost:5000/api/activities/${_id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      }
    );
    const newActivity = [...activities].filter((activity) => {
      return activity._id !== _id;
    });

    setactivities(newActivity);
  };
  const updateActivity = async (e) => {
    e.preventDefault();

     if(!user){
      console.log("You must be logged in")
      return;
    }

  
    const { title, body, specialist, activityType, startDate, endDate  } = updateForm;
    const res = await axios.put(
      `http://localhost:5000/api/activities/${updateForm._id}`,
      {
        title,
        body,
        specialist,
        activityType,
        startDate,
        endDate,
      },
      {
        headers:{
        'Authorization': `Bearer ${user.token}`,
        }
      }
    );
    const newActivity = [...activities];
    const activityIndex = activities.findIndex((activity) => {
      return activity._id === updateForm._id;
    });
    newActivity[activityIndex] = res.data.activity;
    setactivities(newActivity);
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
      specialist: "",
      activityType: "",
      startDate: "",
      endDate: "",
    });
  };
  const filterActivitiesByDate = (activities, date) => {
    const today = new Date().toISOString().split('T')[0];
  
    if (!activities || !activities.length) {
      return [];
    }
  
    if (!date) {
      date = today;
    }
  
    return activities
      .filter((activity) => {
        const startDate = new Date(activity.startDate).toISOString().split('T')[0];
        return startDate >= date;
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };
  
  const filteredActivities = filterActivitiesByDate(activities, dateFilter || null);

  if(userId  && userId.userType === "SPECIALIST" )
  {  
        return (
          <div className="activity-container">
            <div className="activity-split-container">
              <div className="activity-left">

            {updateForm._id && (
              <div>
                <form  className="activity-create-form" onSubmit={updateActivity}>
                <h2>Update reservation</h2>
                <h4>Update the title if your activity :</h4>
                <FormControl >
                      <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateForm.title}
                        label="title"
                        name="title"
                        onChange={handleUpdateFieldChange}
                      >
                        <MenuItem value={"Aerobics"}>Aerobics</MenuItem>
                        <MenuItem value={"Weight training"}>Weight training</MenuItem>
                        <MenuItem value={"Flexibility training"}>Flexibility training</MenuItem>
                        <MenuItem value={"Yoga"}>Yoga</MenuItem>
                        <MenuItem value={"Mobility training"}>Mobility training</MenuItem>
                        <MenuItem value={"Sports massage"}>Sports massage</MenuItem>
                        <MenuItem value={"Deep tissue massage"}>Deep tissue massage</MenuItem>
                        <MenuItem value={"Pressure point massage"}>Pressure point massage</MenuItem>
                        <MenuItem value={"Hot stone massage"}>Hot stone massage</MenuItem>
                        <MenuItem value={"Lymphatic drainage massage"}>Lymphatic drainage massage</MenuItem>
                        <MenuItem value={"Dry needle physiotherapy"}>Dry needle physiotherapy</MenuItem>
                        <MenuItem value={"Sports physiotherapy"}>Sports physiotherapy</MenuItem>
                        <MenuItem value={"Orthopedic physiotherapy"}>Orthopedic physiotherapy</MenuItem>
                      </Select>
                      </FormControl>
                <h4>Update the description of your activity :</h4>
                  <textarea
                    onChange={handleUpdateFieldChange}
                    value={updateForm.body}
                    name="body"
                  />
                <h4>Update the type of your activity :</h4>
                    <FormControl >
                      <InputLabel id="activityType-label-update">Type</InputLabel>
                      <Select
                        labelId="activityType-label-update"
                        id="activityTypeUpdate"
                        value={updateForm.activityType}
                        label="Type"
                        name="activityType"
                        onChange={handleUpdateFieldChange}
                      >
                        <MenuItem value={"MassageTherapist"}>Massage therapist</MenuItem>
                        <MenuItem value={"Trainer"}>Trainer</MenuItem>
                        <MenuItem value={"Physiotherapist"}>Physiotherapist</MenuItem>
                      </Select>
                    </FormControl>

                  <h4>Update the time your activity starts:</h4>
                  <input
                    type="datetime-local"
                    onChange={handleUpdateFieldChange}
                    value={updateForm.startDate}
                    name="startDate"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                      <h4>Update the time your activity ends:</h4>
                  <input
                    type="datetime-local"
                    onChange={handleUpdateFieldChange}
                    value={updateForm.endDate}
                    name="endDate"
                    min={new Date().toISOString().slice(0, 16)}
                  />

                  <button type="submit">Update activity</button>
                </form>
              </div>
            )}

            {!updateForm._id && (
              <div >
               
                <form  className="activity-create-form" onSubmit={createActivity}>
                <h2>Create activity</h2>
                      <h4>Enter activity title:</h4>
                      <FormControl>
                      <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={createForm.title}
                        label="title"
                        name="title"
                        onChange={updateCreateFormField}
                      >
                        <MenuItem value={"Aerobics"}>Aerobics</MenuItem>
                        <MenuItem value={"Weight training"}>Weight training</MenuItem>
                        <MenuItem value={"Flexibility training"}>Flexibility training</MenuItem>
                        <MenuItem value={"Yoga"}>Yoga</MenuItem>
                        <MenuItem value={"Mobility training"}>Mobility training</MenuItem>
                        <MenuItem value={"Sports massage"}>Sports massage</MenuItem>
                        <MenuItem value={"Deep tissue massage"}>Deep tissue massage</MenuItem>
                        <MenuItem value={"Pressure point massage"}>Pressure point massage</MenuItem>
                        <MenuItem value={"Hot stone massage"}>Hot stone massage</MenuItem>
                        <MenuItem value={"Lymphatic drainage massage"}>Lymphatic drainage massage</MenuItem>
                        <MenuItem value={"Dry needle physiotherapy"}>Dry needle physiotherapy</MenuItem>
                        <MenuItem value={"Sports physiotherapy"}>Sports physiotherapy</MenuItem>
                        <MenuItem value={"Orthopedic physiotherapy"}>Orthopedic physiotherapy</MenuItem>
                      </Select>
                      </FormControl>

                <h4>Enter activity description:</h4>
                  <textarea
                    onChange={updateCreateFormField}
                    value={createForm.body}
                    name="body"
                  />
                      <h4>Enter your full name:</h4>
                      <FormControl >
                      <InputLabel id="demo-simple-select-label2">Creator</InputLabel>
                      <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select2"
                        value={createForm.specialist}
                        label="user"
                        name="specialist"
                        onChange={updateCreateFormField}
                      >
                        <MenuItem value={userId.name + " " + userId.surname}>{userId.name + " " + userId.surname}</MenuItem>
                      </Select>
                      </FormControl>
             
                  <h4>Select the activity type:</h4>
                    <FormControl >
                      <InputLabel id="activityType-label">Type</InputLabel>
                      <Select
                        labelId="activityType-label"
                        id="activityType"
                        value={createForm.activityType}
                        label="Type"
                        name="activityType"
                        onChange={updateCreateFormField}
                      >
                        <MenuItem value={"MassageTherapist"}>Massage therapist</MenuItem>
                        <MenuItem value={"Trainer"}>Trainer</MenuItem>
                        <MenuItem value={"Physiotherapist"}>Physiotherapist</MenuItem>
                      </Select>
                    </FormControl>

                
   
                  <h4>Enter the time your activity starts:</h4>
                  <input
                    type="datetime-local"
                    onChange={updateCreateFormField}
                    value={createForm.startDate}
                    name="startDate"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <h4>Enter the time your activity ends:</h4>
                  <input
                    type="datetime-local"
                    onChange={updateCreateFormField}
                    value={createForm.endDate}
                    name="endDate"
                    min={new Date().toISOString().slice(0, 16)}
                  />

                <button type="submit">Create activity</button>
                  <p className="orange">{errorMessage}</p>
                </form>
              </div>
            )}
            </div>

            <div className="activity-right">
              <div className="activities">
                <h2>Your activities: </h2>
                <div className="filter">
                      <label htmlFor="date-filter">Filter by Date: </label>
                      <input type="date" id="date-filter"  onChange={(e) => setDateFilter(e.target.value)} />
                    </div>
                    {dateFilter && <h2>Activities from {dateFilter}:</h2>}<br/>
                <div className="activity-grid">
                {filteredActivities &&
                  filteredActivities.map((activity) => {
                    const isPastDate = new Date(activity.startDate) < new Date().setHours(0, 0, 0, 0);
                    return (
                      <div className="activities-small-box" key={activity._id}>
                        <h3>{activity.title}</h3>
                        <p>{activity.body}</p>
                        <p>{activity.specialist}</p>
                        <p>{activity.activityType}</p>
                        <p>{moment(activity.startDate).format('YYYY-MM-DD HH:mm')}</p>
                        <p>{moment(activity.endDate).format('YYYY-MM-DD HH:mm')}</p>
       
                          {!isPastDate && (
                             <>
                            <button className="small-button" onClick={() => deleteActivity(activity._id)}>Delete activity</button>
                          
                            <button className="small-button" onClick={() => toggleUpdate(activity)}>Update activity</button>  </>
                            )} 
                      </div>
                    );
                  })}
                  </div>

                </div>
            </div>
            </div>
            <UserRegistrations/>
          </div>
        );
    }
    if(userId == undefined) {
      return (
       <div>Loading</div>
       )
    }
    if(userId  && userId.userType === "CLIENT" ){
      navigate(`/`);
      return (
       <Home /> 
      )
    };
    if(userId  && userId.userType === "MANAGER" ){
      navigate(`/dataDashboard`);
      return (
       <DataDashboard /> 
      )
    };
}

export default Activities;
