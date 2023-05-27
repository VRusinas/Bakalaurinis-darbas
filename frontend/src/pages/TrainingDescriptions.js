import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/activityDescriptions.css"

const TrainingDescriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aerobics');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/training/${tab}`);
  };

  return (
    <div>
      <div className="tabs activity-nav">

        <button className={`activity-nav-button tab ${activeTab === 'aerobics' ? 'active' : ''}`} onClick={() => handleTabClick('aerobics')}>Aerobics
        </button>

        <button className={`activity-nav-button tab ${activeTab === 'weightTraining' ? 'active' : ''}`}onClick={() => handleTabClick('weightTraining')} >Weight Training
        </button>

        <button className={`activity-nav-button tab ${activeTab === 'flexibilityTraining' ? 'active' : ''}`}onClick={() => handleTabClick('flexibilityTraining')}> Flexibility Training
        </button>

        <button className={`activity-nav-button tab ${activeTab === 'yoga' ? 'active' : ''}`}onClick={() => handleTabClick('yoga')}> Yoga
        </button>

        <button className={`activity-nav-button tab ${activeTab === 'mobilityTraining' ? 'active' : ''}`}onClick={() => handleTabClick('mobilityTraining')}> Mobility Training
        </button>

      </div>



    </div>
  );
};

export default TrainingDescriptions;
