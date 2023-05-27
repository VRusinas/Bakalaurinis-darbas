import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import Notification from "./Notification";
import axios from "axios";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [userfetch, setUserfetch] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/protectedUser/id`,
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserfetch(response.data.user[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (user) {
      fetchUser();
    }
  
  }, [user]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = () => {
    navigate(`/`);
    logout();
  };

  const handleSchedulesClick = () => {
    localStorage.setItem("eventType", "Trainer");
  };

     if(userfetch.userType === "SPECIALIST" || userfetch.userType === "MANAGER"){
      return(       
      <header>
        <div className="container">
          <div className="navContainer">
            <nav className="right-side right-pad">
              {user && (
                <div className="logged-in-container">
                  <span> {user.email}</span>
                  <div className="display-nav-flex">
                  {userfetch && userfetch.userType !== "SPECIALIST" && (
                    <Link
                      className={`link ${
                        activeLink.includes("/dataDashboard") ? "active" : ""
                      }`}
                      to="/dataDashboard"
                      onClick={handleSchedulesClick}
                    >
                      Data dashboard
                    </Link>
                  )}
                    {userfetch && userfetch.userType !== "MANAGER" && (
                    <Link
                      className={`  link ${
                        activeLink.includes("/activityCreation") ? "active" : ""
                      }`}
                      to="/activityCreation"
                      onClick={handleSchedulesClick}
                    >
                      Activity creation
                    </Link>
                  )}
                  <Link
                    className={`right-pad link ${
                      activeLink.includes("/schedules/") ? "active" : ""
                    }`}
                    to="/schedules/Trainer"
                    onClick={handleSchedulesClick}
                  >
                    Schedules
                  </Link>
            
                    <button className="logout padding-nav-button right-pad" onClick={handleClick}>
                      Log out
                    </button>
                  </div>
             
                </div>
              )}

              {!user && (
                <div>
                  <button className="nav-button-notloggedin">
                    <Link className="text-decoration-none" to="/login">
                      Login
                    </Link>
                  </button>
                  <button className="nav-button-notloggedin">
                    <Link className="text-decoration-none" to="/signup">
                      Signup
                    </Link>
                  </button>
                  
                </div>
              )}
            </nav>
          </div>
        </div>
</header>)
     }
    if(userfetch.userType === "CLIENT" || !user){
      return (
        <header>
            <div className="container">
              <div className="navContainer">
              <div className={`left-side ${userfetch.userType !== "CLIENT" && userfetch.userType !== undefined ? "hide" : ""}`}>
                  <Link className={`link ${activeLink === "/" ? "active" : ""}`} to="/">
                    Home
                  </Link>
                  <Link
                    className={` link ${
                      activeLink.includes("/specialists") ? "active" : ""
                    }`}
                    to="/specialists"
                  >
                    Specialists
                  </Link>
                  <Link
                    className={`link ${
                      activeLink.includes("/schedules/") ? "active" : ""
                    }`}
                    to="/schedules/Trainer"
                    onClick={handleSchedulesClick}
                  >
                    Schedules
                  </Link>
                  <Link
                    className={`link ${
                      activeLink.includes("/training/") ? "active" : ""
                    }`}
                    to="/training/aerobics"
                  >
                    Training
                  </Link>
                  <Link
                    className={`link ${
                      activeLink.includes("/massages/") ? "active" : ""
                    }`}
                    to="/massages/sports"
                  >
                    Massages
                  </Link>
                  <Link
                    className={`link ${
                      activeLink.includes("/physiotherapy/") ? "active" : ""
                    }`}
                    to="/physiotherapy/dryNeedling"
                  >
                    Physiotherapy
                  </Link>
                  <Link className={`link ${activeLink === "/saunas" ? "active" : ""}`} to="/saunas">
                    Saunas
                  </Link>
                  <Link className={`link ${activeLink === "/pool" ? "active" : ""}`} to="/pool">
                    Pool
                  </Link>
                  <Link className={`link ${activeLink === "/askUs" ? "active" : ""}`} to="/askUs">
                    Questions
                  </Link>
                  <Link className={`link ${activeLink === "/contacts" ? "active" : ""}`} to="/contacts">
                    Contacts
                  </Link>
                </div>
  
                <nav className="right-side right-pad">
                  {user && (
                    <div className="logged-in-container">
                      <span> {user.email}</span>
                      <div className="display-nav-flex">
                        <button className="logout padding-nav-button" onClick={handleClick}>
                          Log out
                        </button>
  
                          <div>
                            <button className="padding-nav-button">
                              <Link className="text-decoration-none" to="/dashboard">
                                Dashboard
                              </Link>
                            </button>
                            <Notification />
                          </div>
                      </div>
                    </div>
                  )}
                  {!user && (
                    <div>
                      <button className="nav-button-notloggedin">
                        <Link className="text-decoration-none" to="/login">
                          Login
                        </Link>
                      </button>
                      <button className="nav-button-notloggedin">
                        <Link className="text-decoration-none" to="/signup">
                          Signup
                        </Link>
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
    </header>
      );
    } 
};

export default Navbar
