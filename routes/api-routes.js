const express = require("express");
const router = express.Router();
// const emailController = require("../controllers/emailController");
const googleApiController = require("../controller/google-api");

// router.post("/send-email", emailController.sendEmail);
router.get("/autocomplete", googleApiController.autocomplete);
router.get("/geocode", googleApiController.geocode);
router.get("/reverse-geocode", googleApiController.reverseGeocode);

module.exports = router;
