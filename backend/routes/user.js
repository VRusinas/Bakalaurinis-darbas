const {  fetchUser } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.post("/id", fetchUser);

module.exports = router;