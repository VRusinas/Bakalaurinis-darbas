import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/activityDescriptions.css"

const MassageDescriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sports');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/massages/${tab}`);
  };

  return (
    <div>
      <div className="tabs">
        <button className={`activity-nav-button tab ${activeTab === 'sports' ? 'active' : ''}`} onClick={() => handleTabClick('sports')}>Sports</button>
        <button className={`activity-nav-button tab ${activeTab === 'deepTissue' ? 'active' : ''}`}onClick={() => handleTabClick('deepTissue')}>Deep Tissue</button>
        <button className={`activity-nav-button tab ${activeTab === 'pressurePoint' ? 'active' : ''}`}onClick={() => handleTabClick('pressurePoint')}>Pressure Point</button>
        <button className={`activity-nav-button tab ${activeTab === 'hotStone' ? 'active' : ''}`}onClick={() => handleTabClick('hotStone')}>Hot Stone</button>
        <button className={`activity-nav-button tab ${activeTab === 'lymphaticDrainage' ? 'active' : ''}`}onClick={() => handleTabClick('lymphaticDrainage')}>Lymphatic Drainage</button>
      </div>
    </div>
  );
};

export default MassageDescriptions;
