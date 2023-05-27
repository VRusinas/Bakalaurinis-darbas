import React from "react";
import Subscription from "../components/Subscription";
import "../styles/home.css";
import "../styles/global.css";

const home = () => {
  return <div className="home-container fade-in">
      <div className="subscribtion-box">
        <h1 className="subscribtion-main-title main-Title white">Welcome to the wellness center</h1>
        <h3 className="subscribtion-second-title second-Title white">If you want to be updated with our latest news please subscribe <br/> to our website in the field below</h3>
      <Subscription/>
      </div>

    </div>;
};

export default home;
