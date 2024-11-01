const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: process.env.EMAIL_USER,
    subject: "😎 New Quiz Solar Roof Lead 🔥",
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
};
