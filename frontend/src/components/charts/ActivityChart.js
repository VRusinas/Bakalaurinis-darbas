import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Chart from 'chart.js/auto';

const ActivityChart = ({ activityType, chartId }) => {
  const { user } = useAuthContext();
  const [activities, setactivities] = useState(null);

  const fetchAllActivities = async () => {
    const res = await axios.get("http://localhost:5000/api/manager/getAllActivities", {
      headers: {
        'Authorization': `Bearer ${user?.token}`,
      },
    });
    const filteredActivities = res.data.activities.filter(activity => activity.activityType === activityType);
    const sortedActivities = filteredActivities.sort((a, b) => a.title.localeCompare(b.title)); 
    setactivities(sortedActivities);
  };
  
  useEffect(() => {
    fetchAllActivities();
  }, [activityType]);

  useEffect(() => {
    if (activities) {
      const activityData = activities.reduce((acc, curr) => {
        acc[curr.title] = acc[curr.title] ? acc[curr.title] + 1 : 1;
        return acc;
      }, {});

      const chartData = {
        labels: Object.keys(activityData),
        datasets: [
          {
            label: 'Conducted Activities', 
            data: Object.values(activityData),
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
              text: 'Conducted Activities',
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
              text: 'Activity Title',
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
    }
  }, [activities, chartId]);

  return (
    <div>
      <h2>{activityType} - activities</h2>
      <canvas id={chartId} height="200"></canvas>
    </div>
  )
}

export default ActivityChart;
