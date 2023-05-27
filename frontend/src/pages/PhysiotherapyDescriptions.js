import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/activityDescriptions.css"

const PhysiotherapyDescriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dryNeedling');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/physiotherapy/${tab}`);
  };

  return (
    <div>
      <div className="tabs">
        <button className={`activity-nav-button tab ${activeTab === 'dryNeedling' ? 'active' : ''}`} onClick={() => handleTabClick('dryNeedling')}>Dry Needling</button>
        <button className={`activity-nav-button tab ${activeTab === 'sportsPhysiotherapy' ? 'active' : ''}`}onClick={() => handleTabClick('sportsPhysiotherapy')}>Sports Physiotherapy</button>
        <button className={`activity-nav-button tab ${activeTab === 'orthopedicPhysiotherapy' ? 'active' : ''}`}onClick={() => handleTabClick('orthopedicPhysiotherapy')}>Orthopedic Physiotherapy</button>
      </div>
    </div>
  );
};

export default PhysiotherapyDescriptions;
