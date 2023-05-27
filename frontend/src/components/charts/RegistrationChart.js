import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Chart from 'chart.js/auto';

const RegistrationChart = ({ activityType, chartId }) => {
  const { user } = useAuthContext();
  const [activities, setactivities] = useState(null);
  const [mostPopular, setMostPopular] = useState("");
  const [leastPopular, setLeastPopular] = useState("");

  const fetchAllRegistrations = async () => {
    const res = await axios.get("http://localhost:5000/api/manager/getAllRegistrations", {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const filteredActivities = res.data.activityRegistrations.filter(activity => activity.activityType === activityType);
    setactivities(filteredActivities);
  };

  useEffect(() => {
    fetchAllRegistrations();
  }, [activityType]);

  useEffect(() => {
    if (activities) {
      const activityData = activities.reduce((acc, curr) => {
        acc[curr.title] = acc[curr.title] ? acc[curr.title] + 1 : 1;
        return acc;
      }, {});
  
      const sortedKeys = Object.keys(activityData).sort((a, b) => a.localeCompare(b)); // Sort alphabetically
      const sortedData = sortedKeys.map(key => activityData[key]);
  
      const chartData = {
        labels: sortedKeys,
        datasets: [
          {
            label: 'Registered Activities',
            data: sortedData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Registrations',
              font: {
                weight: 'bold', 
              },
            },
            ticks: {
              stepSize: 1,
            },
          },
          x: {
            title: {
              display: true,
              text: 'Registration Title',
              font: {
                weight: 'bold', 
              },
            },
          },
        },
      };
  
      const ctx = document.getElementById(chartId).getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options,
      });
  
      const maxRegistrations = Math.max(...sortedData);
      const minRegistrations = Math.min(...sortedData);
      const mostPopularChoice = Object.keys(activityData).find(key => activityData[key] === maxRegistrations);
      const leastPopularChoice = Object.keys(activityData).find(key => activityData[key] === minRegistrations);
  
      setMostPopular(mostPopularChoice);
      setLeastPopular(leastPopularChoice);
  
    }
  }, [activities, chartId]);
  

return (
  <div>
    <h2>{activityType} - registrations</h2>
    <canvas id={chartId} height="200"></canvas><br/>
    <p>Most popular choice:  <b>{mostPopular}</b></p>
    <p>Number of registrations for most popular choice: <b>{activities ? activities.filter(activity => activity.title === mostPopular).length : ""}</b></p>
    <p>Least popular choice: <b>{leastPopular}</b></p>
    <p>Number of registrations for least popular choice: <b>{activities ? activities.filter(activity => activity.title === leastPopular).length : ""}</b></p>

  </div>
)

}

export default RegistrationChart;
