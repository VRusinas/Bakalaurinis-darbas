const Activity = require("../models/Activities");
const Registration = require("../models/ActivityRegistrationModel");
const nodemailer = require('nodemailer');

const fetchActivities = async (req, res) => {
  const user_id = req.user.id;
  const activities = await Activity.find({user_id: user_id});
  res.json({ activities: activities });
};

const fetchActivity = async (req, res) => {
  const activityId = req.params.id;
  const activity = await Activity.findById(activityId);
  res.json({ activity: activity });
};

const createActivity = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const specialist = req.body.specialist;
  const activityType = req.body.activityType;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const user_id = req.user._id;
  try { 
      const activity = await Activity.create({
    title: title,
    body: body,
    specialist: specialist,
    activityType : activityType,
    startDate: startDate,
    endDate: endDate,
    user_id: user_id,
  });
  res.status(200).json({ activity: activity });
  } catch (error) {
    res.status(400).json({ error:error.message });
  }
};

const updateActivity = async (req, res) => {
  const activityId = req.params.id;
  const specialistId = req.user.id;
  const title = req.body.title;
  const body = req.body.body;
  const specialist = req.body.specialist;
  const activityType = req.body.activityType;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const activityOld = await Activity.findById(activityId);
  const oldTitle = activityOld.title;
  const oldBody = activityOld.body;
  const oldSpecialist = activityOld.specialist;
  const oldActivityType = activityOld.activityType;
  const oldStartDate = activityOld.startDate;
  const oldEndDate = activityOld.endDate;

  await Activity.findByIdAndUpdate(activityId, {
    title: title,
    body: body,
    specialist: specialist,
    activityType: activityType,
    startDate: startDate,
    endDate: endDate,
  });

  const activity = await Activity.findById(activityId);

  await Registration.updateMany(
    {
      specialist_id: specialistId,
      title: oldTitle,
      body: oldBody,
      activityType: oldActivityType,
      specialistName: oldSpecialist,
      startDate: oldStartDate,
      endDate: oldEndDate,
    },
    {
      title: title,
      body: body,
      activityType: activityType,
      startDate: startDate,
      endDate: endDate,
    }
  );

  const registeredUsers = await Registration.find(
    { 
      specialist_id: specialistId, 
      title: activity.title,
      body: activity.body,
      activityType: activity.activityType, 
      specialistName: activity.specialist, 
      startDate: activity.startDate, 
      endDate: activity.endDate
    },
    { email: 1, clientEmail: 1 } 
  )
  const emailBody = `<p>Hello,</p>
  <p>The activity <strong>${oldTitle}</strong> made by <strong>${oldSpecialist}</strong> has been updated:</p>
  <p><strong>Title:</strong> ${title}</p>
  <p><strong>Description:</strong> ${body}</p>
  <p><strong>Activity Start Time:</strong> ${activity.startDate.toISOString().slice(0, 10)} ${activity.startDate.toTimeString().slice(0, 5)}</p>
  <p><strong>Activity End Time:</strong> ${activity.endDate.toISOString().slice(0, 10)} ${activity.endDate.toTimeString().slice(0, 5)}</p>
  <p>We apologize for any inconvenience caused and thank you for your understanding.</p>
  <p>Have a great day!</p>`;

   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wellnesscenterbd2023@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  
  registeredUsers.forEach((user) => {
    const mailOptions = {
      from: 'wellnesscenterbd2023@gmail.com',
      to: user.clientEmail, 
      subject: 'Activity Update Notification',
      html: emailBody
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  res.json({ activity: activity, registrations: registeredUsers });
};

const deleteActivity = async (req, res) => {
  const activityId = req.params.id;
  const user_id = req.user.id;
  const activity = await Activity.findById(activityId);
  const registeredUsers = await Registration.find(
    { 
      specialist_id: user_id, 
      title: activity.title,
      body: activity.body,
      activityType: activity.activityType, 
      specialistName: activity.specialist, 
      startDate: activity.startDate, 
      endDate: activity.endDate
    },
    { email: 1, clientEmail: 1 } 
  );
  
  await Activity.deleteOne({ _id: activityId });
  await Registration.deleteMany(
    { 
      specialist_id: user_id, 
      title: activity.title,
      body: activity.body,
      activityType: activity.activityType, 
      specialistName: activity.specialist, 
      startDate: activity.startDate, 
      endDate: activity.endDate
    }
  );
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wellnesscenterbd2023@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  
  registeredUsers.forEach((user) => {
    const mailOptions = {
      from: 'wellnesscenterbd2023@gmail.com',
      to: user.clientEmail,
      subject: 'Activity Cancellation Notification',
      text: `Hello,\n\nWe would like to inform you that the following activity has been cancelled by ${activity.specialist}:\n\n`
        + `Title: ${activity.title}\n`
        + `Date: ${activity.startDate.toISOString().slice(0, 10)}\n`
        + `Time: ${activity.startDate.toTimeString().slice(0, 5)}\n\n`
        + `We apologize for any inconvenience caused and thank you for your understanding.\n\n`
        + `Have a great day!`

    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
 
  res.json({ Success: "Workout deleted" });
};

module.exports = {
  fetchActivities,
  fetchActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
