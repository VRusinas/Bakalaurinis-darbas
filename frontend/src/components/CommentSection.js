import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { FaStar } from "react-icons/fa";
import"../styles/comments.css";
import"../styles/button.css";
import moment from 'moment';

const CommentSection = ({ pageId }) => {
  const { user } = useAuthContext();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState('');
  const [editComment, setEditComment] = useState(null);
  const [editRating, setEditRating] = useState('');
  const [userInfo, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/all/comments`, {
          });
          const filteredComments = response.data.filter((comment) => comment.pageId === pageId);
          setComments(filteredComments);
        
      } catch (error) {
        console.error(error);
      }
    };
        const fetchUserType = async () => {
            if (!user) {
                return;
              }
        const response = await axios.post(`http://localhost:5000/api/protectedUser/id`,{
        email: user.email}, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            },
        });
        const json = JSON.stringify(response.data.user[0]);
          setUserId(response.data.user[0]);
      };
    fetchComments();
    fetchUserType();
  }, [pageId, user, comments]);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!comment || !rating) {
      setError('Please fill in the comment and rating fields.');
      return;
    }
    else{  setError('');}
  
    const response = await axios.post('http://localhost:5000/api/comments', {
      name: userInfo.name + " " + userInfo.surname,
      comment,
      rating,
      pageId,
      email: user.email,
    },
    {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
  
    setComments([...comments, response.data]);
    setName('');
    setComment('');
    setRating('');
  };
  
  const handleDelete = async (commentId) => {
    if (!user) {
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            email: user.email,
          },
        }
      );
  
      if (response.status === 204) {
        const newComments = comments.filter((comment) => comment._id !== commentId);
        setComments(newComments);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(
      `http://localhost:5000/api/comments/${editComment._id}`,
      {
        comment: editComment.comment,
        rating: editRating,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      const updatedComments = comments.map((comment) =>
        comment._id === editComment._id ? response.data : comment
      );
      setComments(updatedComments);
      setEditComment(null);
    }
  };
  
  const handleEdit = (comment) => {
    setEditComment(comment);
    setEditRating(comment.rating);
  };
  
  return (
    <div className='main-comment-container'>
              {user && (
                  <form className='make-comment-container' onSubmit={handleSubmit}>
                      <div className='comment-box' >
                          <label htmlFor="comment"><h3>Share your experiences by making a comment!</h3></label>
                          <p className='orange'>{error}</p>
                          <textarea
                          className='comment-input'
                              id="comment"
                              value={comment}
                              onChange={(event) => setComment(event.target.value)}
                          />
                          <div>
                              <p>Leave a rating:</p>
                              {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={24}
                              color={i < rating ? "#ffc107" : "#e4e5e9"}
                              onClick={() => setRating(i + 1)}
                              style={{ marginRight: 10, cursor: "pointer" }}
                            />
                          ))}
                        </div>
                        <button className='button' type="submit">Submit</button>
                      </div>
                  </form>
                  )}

          {editComment && (
                  <form className='edit-comments-container' onSubmit={handleEditSubmit}>
                  <div >
                    <label htmlFor="comment-edit">Edit Comment:</label>
                    <textarea
                    className='comment-input'
                      id="comment-edit"
                      value={editComment.comment}
                      onChange={(event) =>
                        setEditComment({ ...editComment, comment: event.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="rating-edit">Edit Rating:</label>
                    {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={24}
                              color={i < editRating ? "#ffc107" : "#e4e5e9"}
                              onClick={() => setEditRating(i + 1)}
                              style={{ marginRight: 10, cursor: "pointer" }}
                            />
                          ))}
                  </div>
                  <div>
                  <button className='small-button' type="submit">Save</button>
                  <button className='small-button' type="button" onClick={() => setEditComment(null)}>Cancel</button>
                  </div>
                
                </form>
                
                )}


          <div className='comments-container'>
            <h2>Comments:</h2>
            <br/>
            {comments
              .filter((comment) => comment.pageId === pageId)
              .map((comment) => (
                <div key={comment._id}>
                  <h3>{comment.name}</h3>
                  <p className='max-comment-width'>{comment.comment}</p>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        color={i < comment.rating ? "#ffc107" : "#e4e5e9"}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </div>
                  <p>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm')}</p>

                  {user && user.email === comment.email && (
                    <>
                      <button className='small-button' onClick={() => handleEdit(comment)}>Edit</button>
                      <button className='small-button' onClick={() => handleDelete(comment._id)}>Remove</button>
                    </>
                  )}
                </div>
              ))}
          </div>
    </div>
  );
};

export default CommentSection;
