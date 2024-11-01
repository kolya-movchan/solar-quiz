const express = require("express");
// const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
// const axios = require("axios");
const twilioRouter = require("./routes/twilio-sms");
const path = require("path");
const apiRouter = require("./routes/api-routes");
const emailRouter = require("./routes/send-email");

require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "build")));

console.log("port: ", port);
console.log("email: ", process.env.EMAIL_USER);
console.log("pass: ", process.env.EMAIL_PASS);

const corsOptions = {
  origin: "*", // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/twilio-sms", twilioRouter);
app.use("/api", apiRouter);
app.use("/send-email", emailRouter);
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
