const express = require("express");

const {
  fetchActivities,
  fetchActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", fetchActivities);

router.get("/:id", fetchActivity);

router.post("/", createActivity);

router.delete("/:id", deleteActivity);

router.put("/:id", updateActivity);

module.exports = router;
