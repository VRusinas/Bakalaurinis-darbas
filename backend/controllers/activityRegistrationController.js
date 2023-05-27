const ActivityRegistration = require("../models/ActivityRegistrationModel");

const fetchActivitiesbyCreator = async (req, res) => {
  const specialist_id = req.user.id;
  const activityRegistrations = await ActivityRegistration.find({specialist_id: specialist_id});
  res.json({ activityRegistrations: activityRegistrations });
};
const fetchActivitiesbyClient = async (req, res) => {
    const client_id = req.user.id;
    const activityRegistration = await ActivityRegistration.find({client_id: client_id});
    res.json({ activityRegistration: activityRegistration });
  };

const fetchActivityRegistration= async (req, res) => {
  const activityId = req.params.id;
  const activityRegistrations = await ActivityRegistration.findById(activityId);
  res.json({ activityRegistrations: activityRegistrations });
};

const createActivityRegistration= async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const specialistName = req.body.specialistName;
  const activityType = req.body.activityType;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const specialist_id = req.body.specialist_id; 
  const client_id = req.user._id; 
  const clientName = req.body.clientName;
  const clientSurname = req.body.clientSurname;
  const clientEmail = req.body.clientEmail;
  try { 
      const activityRegistrations = await ActivityRegistration.create({
    title: title,
    body: body,
    specialistName: specialistName,
    activityType : activityType,
    startDate: startDate,
    endDate: endDate,
    specialist_id: specialist_id,
    client_id: client_id,
    clientName : clientName,
    clientSurname : clientSurname,
    clientEmail : clientEmail,
  });

  res.status(200).json({ activityRegistrations: activityRegistrations });
  } catch (error) {
    res.status(400).json({ error:error.message });
  }
};

const updateActivityRegistration = async (req, res) => {

  activityId = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  const specialistName = req.body.specialistName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const specialist_id = req.body.specialist_id;
  const clientName = req.body.clientName;
  const clientSurname = req.body.clientSurname;
  const clientEmail = req.body.clientEmail;
  
  await ActivityRegistration.findByIdAndUpdate(activityId, {
    title: title,
    body: body,
    specialistName: specialistName,
    startDate: startDate,
    endDate: endDate,
    specialist_id : specialist_id,
    clientName : clientName,
    clientSurname : clientSurname,
    clientEmail : clientEmail,
  });
  const activityRegistrations = await ActivityRegistration.findById(activityId);
  res.json({ activityRegistrations: activityRegistrations });
};

const deleteActivityRegistration = async (req, res) => {
  const activityId = req.params.id;
  await ActivityRegistration.deleteOne({ _id: activityId });
  res.json({ Success: "Registration canceled" });
};

module.exports = {
  fetchActivitiesbyCreator,
  fetchActivitiesbyClient,
  fetchActivityRegistration,
  fetchActivityRegistration,
  createActivityRegistration,
  updateActivityRegistration,
  deleteActivityRegistration,
};
