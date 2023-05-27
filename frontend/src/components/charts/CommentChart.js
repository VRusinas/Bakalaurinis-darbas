import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const CommentChart = () => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/manager/getAllComments',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllComments();
  }, [user]);

  const pageRatings = comments.reduce((acc, curr) => {
    if (!acc[curr.pageId]) {
      acc[curr.pageId] = {
        total: 0,
        count: 0,
      };
    }

    acc[curr.pageId].total += parseInt(curr.rating);
    acc[curr.pageId].count++;

    return acc;
  }, {});

  const pageAvgRatings = Object.entries(pageRatings).map(([pageId, { total, count }]) => ({
    pageId: pageId.charAt(0).toUpperCase() + pageId.slice(1).replace(/([A-Z])/g, ' $1'),
    rating: total / count,
    count,
  }));

  const sortedPageAvgRatings = pageAvgRatings.sort((a, b) => b.rating - a.rating);

  const top10PageAvgRatings = sortedPageAvgRatings.slice(0, 10);

  return (
    <div>
      <h2>Activity user ratings</h2>
      {top10PageAvgRatings.map(({ pageId, rating, count }, index) => (
        <div key={pageId}>
          <p>{index + 1}. Activity name: {pageId}</p>
          <p>Average rating: {rating.toFixed(2)}</p>
          <p>Quantity of ratings: {count}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CommentChart;
