const {  fetchAllActivities } = require("../controllers/scheduleController");

const express = require("express");

const router = express.Router();

router.get("/allActivities", fetchAllActivities);

module.exports = router;