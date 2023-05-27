const Activity = require("../models/Activities");
const fetchAllActivities = async (req, res) => {
    const activities = await Activity.find();
    res.json({ activities: activities });
  };

  module.exports = {
    fetchAllActivities
  };