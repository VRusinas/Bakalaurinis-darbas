const Activity = require("../models/Activities");
const ActivityRegistration = require("../models/ActivityRegistrationModel");
const Comment = require('../models/Comment');

const getAllActivities = async (req, res) => {
    const user_id = req.user.id;
    const activities = await Activity.find();
    res.json({ activities: activities });
  };

const getAllRegistrations = async (req, res) => {
  const specialist_id = req.user.id;
  const activityRegistrations = await ActivityRegistration.find();
  res.json({ activityRegistrations: activityRegistrations });
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllActivities,
    getAllRegistrations,
    getAllComments,
  };
  