import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Chart from 'chart.js/auto';
import moment from "moment";

const MostPopularChart = ({ chartId }) => {
  const { user } = useAuthContext();
  const [activities, setActivities] = useState(null);
  const [specActivities, setSpecActivities] = useState(null);
  const [mostPopular, setMostPopular] = useState("");
  const [leastPopular, setLeastPopular] = useState("");
  const [showAllData, setShowAllData] = useState(false);
  const chartRef = useRef(null);

  const fetchAllRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/manager/getAllRegistrations", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      setActivities(res.data.activityRegistrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const fetchAllActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/manager/getAllActivities", {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      setSpecActivities(res.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchAllRegistrations();
    fetchAllActivities();
  }, []);

  useEffect(() => {
    if (activities && specActivities) {
      let filteredActivities = activities;
      let filteredSpecActivities = specActivities;

      if (!showAllData) {
        const currentDate = moment();
        filteredActivities = activities.filter(activity => {
          const startDate = moment(activity.startDate);
          const endDate = moment(activity.endDate);
          return startDate.isSameOrAfter(currentDate.startOf('month')) && endDate.isSameOrBefore(currentDate.endOf('month'));
        });
        filteredSpecActivities = specActivities.filter(activity => {
          const startDate = moment(activity.startDate);
          const endDate = moment(activity.endDate);
          return startDate.isSameOrAfter(currentDate.startOf('month')) && endDate.isSameOrBefore(currentDate.endOf('month'));
        });
      }

      const activityData = filteredActivities.reduce((acc, curr) => {
        acc[curr.title] = acc[curr.title] ? acc[curr.title] + 1 : 1;
        return acc;
      }, {});

      const specActivityData = filteredSpecActivities.reduce((acc, curr) => {
        acc[curr.title] = acc[curr.title] ? acc[curr.title] + 1 : 1;
        return acc;
      }, {});

      let allTitles = [...new Set([...Object.keys(activityData), ...Object.keys(specActivityData)])];

      allTitles.sort();

      const sortedActivityData = allTitles.map(title => activityData[title] || 0);
      const sortedSpecActivityData = allTitles.map(title => specActivityData[title] || 0);

      const chartData = {
        labels: allTitles,
        datasets: [
          {
            label: 'Registered Activities',
            data: sortedActivityData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Ongoing Activities',
            data: sortedSpecActivityData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById(chartId).getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options,
      });

      const maxRegistrations = Math.max(...sortedActivityData);
      const minRegistrations = Math.min(...sortedActivityData);
      const mostPopularChoice = Object.keys(activityData).find(key => activityData[key] === maxRegistrations);
      const leastPopularChoice = Object.keys(activityData).find(key => activityData[key] === minRegistrations + 1);

      setMostPopular(mostPopularChoice);
      setLeastPopular(leastPopularChoice);

      chartRef.current = myChart;
    }
  }, [activities, specActivities, chartId, showAllData]);

  const handleShowAllData = () => {
    setShowAllData(!showAllData);
  };

  return (
    <div>
      <h2>All - registrations</h2>
      <button className="manager-button" onClick={handleShowAllData}>
        {showAllData ? "Show Current Month Data" : "Show All Data"}
      </button>
      <canvas id={chartId} height="150"></canvas>
      <br /><br />
      <p>Most popular choice: <b>{mostPopular}</b> </p>
      <p>Number of registrations for most popular choice: <b>{activities ? activities.filter(activity => activity.title === mostPopular).length : ""}</b></p>
      <p>Least popular choice: <b>{leastPopular}</b></p>
      <p>Number of registrations for least popular choice: <b>{activities ? activities.filter(activity => activity.title === leastPopular).length : ""}</b></p>
    </div>
  );
};

export default MostPopularChart;
