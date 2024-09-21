const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;

console.log("port: ", process.env.PORT);
console.log("email: ", process.env.EMAIL_USER);
console.log("pass: ", process.env.EMAIL_PASS);

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    home_ownership,
    home_type,
    roof_condition,
    provider,
    utility_bill_amount,
    credit_score,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    to: process.env.EMAIL_USER, // You can also send it to another email
    subject: "New Solar Roofs Lead From The Quiz",
    text: `
    Full Name: ${fullName},
    Email: ${email},
    Phone: ${phoneNumber}
    Home_ownership: ${home_ownership},
    Home_type: ${home_type},
    Roof_condition: ${roof_condition},
    Provider: ${provider},
    Utility_bill_amount: ${utility_bill_amount},
    Credit_score: ${credit_score},`,
  };

  try {
    console.log("sending email", mailOptions);
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Backend Says no");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
