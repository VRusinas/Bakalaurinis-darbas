const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const activity = mongoose.model("Activity", activitySchema);

module.exports = activity;
