const express = require('express');
const router = express.Router();
const {
    getAllActivities,
    getAllRegistrations,
    getAllComments } = require("../controllers/managerController"); 

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.get('/getAllActivities', getAllActivities);
router.get('/getAllRegistrations', getAllRegistrations);
router.get('/getAllComments', getAllComments);

module.exports = router;
