const {  sendEmail, gotEmail } = require("../controllers/emailController");

const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

router.post("/send", sendEmail);
router.post("/sent",  requireAuth, gotEmail);

module.exports = router;