const ActivityRegistration = require("../models/ActivityRegistrationModel");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wellnesscenterbd2023@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  }
});

const htmlContent = `
<html>
  <head>
    <title>Custom HTML Email Message</title>
  </head>
  <body>
    <h1>Thank you for joining our subscribers!</h1>
    <p>Here is a short description of our services.</p>
    <p>Lorem IpsumSed ut perspiciatis unde omnis iste natus error 
    sit voluptatem accusantium doloremque laudantium, totam rem 
    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed 
    quia consequuntur magni dolores eos qui ratione voluptatem sequi 
    nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor 
    sit amet, consectetur, adipisci velit, sed quia non numquam eius 
    modi tempora incidunt ut labore et dolore magnam aliquam quaerat 
    voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem 
    ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi 
    consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate 
    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum 
    fugiat quo voluptas nulla pariaturk.</p>
    <p>Have a great day.</p>
  </body>
</html>
`;

function sendEmailToSubscriber(email, subject) {
  let mailOptions = {
    from: 'wellnessCenter@gmail.com',
    to: email,
    subject: 'Wellness center subscription',
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendEmail = function(req, res) {
  let email = req.body.email;
  let subject = req.body.subject;

  sendEmailToSubscriber(email);
  res.json({email})
};

function getSentEmail(email, question, name) {
    const mailOptions2 = {
        to: 'wellnesscenterbd2023@gmail.com',
        subject: "Users " + name + " " + " question",
        replyTo: email,
        text: name +" question: " + question
    };
    
  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
}

const gotEmail = function(req, res) {
  let email = req.body.email;
  let question = req.body.question;
  let name = req.body.name;

  getSentEmail(email, question, name);
  res.json({ email });
};

const sendReminderEmail = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const dayAfterTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1);

  const activities = await ActivityRegistration.find({
    startDate: {
      $gte: nextDay,
      $lt: dayAfterTomorrow,
    },
  });

  const activitiesByClient = {};
  for (const activity of activities) {
    if (!activitiesByClient[activity.clientEmail]) {
      activitiesByClient[activity.clientEmail] = [];
    }
    activitiesByClient[activity.clientEmail].push(activity);
  }

  for (const clientEmail in activitiesByClient) {
    const clientActivities = activitiesByClient[clientEmail];
    const activityList = clientActivities
      .map((activity) => `- ${activity.title} with ${activity.specialistName} on ${activity.startDate.toISOString().slice(0, 10)} at ${activity.startDate.toTimeString().slice(0, 5)}`)
      .join('<br>');

    const mailOptions = {
      from: 'wellnesscenterbd2023@gmail.com',
      to: clientEmail,
      subject: `Reminder: Your Registrations For Tomorrow`,
      html: `Hi,<br><br>You have the following registrations scheduled for tomorrow:<br><br>${activityList}<br><br>Hope to see you soon.<br><br>Have a great day!`,
    };

    await transporter.sendMail(mailOptions);
  }

  const timeUntilNextDay = dayAfterTomorrow.getTime() - Date.now();
  setTimeout(sendReminderEmail, timeUntilNextDay);
};

sendReminderEmail();

module.exports = {
  sendEmail,
  gotEmail
};




