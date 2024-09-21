const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS // Your email password
    }
  });

  const mailOptions = {
    to: process.env.EMAIL_USER, // You can also send it to another email
    subject: 'New Submission',
    text: `Full Name: ${fullName}, Email: ${email}, Phone: ${phoneNumber}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
