if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");

const activityRoutes = require("./routes/activities");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const email = require("./routes/email");
const allActivities = require("./routes/schedule");
const activityRegistrations = require("./routes/activityRegistration");
const commentsRoutes = require('./routes/comments');
const noAuth = require('./routes/noAuth');
const manager = require('./routes/manager');

const app = express();
app.use(cors());

app.use(express.json()); 

app.use("/api/activities", activityRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/ProtectedUser", userRoutes);
app.use("/api/email", email);
app.use("/api/schedules", allActivities);
app.use("/api/registrations", activityRegistrations);
app.use("/api/comments", commentsRoutes);
app.use("/api/all/comments", noAuth);
app.use("/api/manager", manager);

app.listen(process.env.PORT);

connectToDb();
