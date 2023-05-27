import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ActivityChart from "../components/charts/ActivityChart";
import RegistrationChart from "../components/charts/RegistrationChart";
import CommentChart from "../components/charts/CommentChart";
import "../styles/charts.css";
import MostPopularChart from "../components/charts/MostPopularChart";


const DataDashboard = () => {
  const { user } = useAuthContext();
  const [userfetch, setUserfetch] = useState({});
  const [isLoading, setIsLoading] = useState(true);

    const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

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

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (userfetch && userfetch.userType === "MANAGER") {
    return <div className="main-charts-container">
        <h1 className="title-pad">Wellness center data dashboard</h1>
        <div className="chart-container">

          <div className="mainChart"><MostPopularChart chartId="chart9"/></div>
          </div>
        <div className="chart-container">
    
        <div className="chart"><RegistrationChart  chartId="chart4" activityType="Trainer"/></div>
        <div className="chart"><ActivityChart  chartId="chart1" activityType="Trainer" /> </div>
        </div>
        <div className="chart-container">
    
        <div className="chart"><RegistrationChart  chartId="chart5" activityType="MassageTherapist"/></div>
        <div className="chart"><ActivityChart chartId="chart2" activityType="MassageTherapist" /></div>
          </div>
        <div className="chart-container">

        <div className="chart"><RegistrationChart  chartId="chart6" activityType="Physiotherapist"/></div>
        <div className="chart"><ActivityChart chartId="chart3" activityType="Physiotherapist" /></div>
          </div>

          <div className="chart-container">
          <div className="chart"><RegistrationChart  chartId="chart8" activityType="Sauna"/></div>
          </div>

        <div className="chart-container">
        <CommentChart/>
        </div>

    </div>;
  } else {
    return <div>Home</div>;
  }
};

export default DataDashboard;
