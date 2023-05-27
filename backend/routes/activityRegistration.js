const express = require("express");

const {
    fetchActivitiesbyCreator,
    fetchActivitiesbyClient,
    fetchActivityRegistration,
    createActivityRegistration,
    updateActivityRegistration,
    deleteActivityRegistration,
} = require("../controllers/activityRegistrationController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/userRegistrations", fetchActivitiesbyCreator);

router.get("/myRegistrations", fetchActivitiesbyClient);

router.get("/:id", fetchActivityRegistration);

router.post("/", createActivityRegistration);

router.delete("/:id", deleteActivityRegistration);

router.put("/:id", updateActivityRegistration);

module.exports = router;
