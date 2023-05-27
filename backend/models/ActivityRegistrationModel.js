const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  specialistName: {
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
  specialist_id: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  clientName:{
    type: String,
    required: true,
  },
  clientSurname:{
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
});

const Registrations = mongoose.model("Registration", registrationSchema);

module.exports = Registrations;
