const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const twilioRouter = require("./src/routes/twilio-sms");

require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;

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

app.get("/", (req, res) => {
  res.send("Hello Vercel");
});

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
});

// Define your API route
app.get("/api/autocomplete", async (req, res) => {
  const { input } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input,
          key: process.env.GOOGLE_MAPS_API_KEY, // Use your backend's environment variable
          components: "country:us",
          types: "address",
        },
      }
    );

    res.status(200).json({ data: response.data }); // Send the received data back to the front-end
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/geocode", async (req, res) => {
  console.log("geocode");
  const { place_id } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          place_id,
          key: process.env.GOOGLE_MAPS_API_KEY, // Use your backend's environment variable
        },
      }
    );

    res.status(200).json({ data: response.data }); // Send the received data back to the front-end
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/reverse-geocode", async (req, res) => {
  const { lat, lng } = req.query;
  const coordinates = { lat, lng };

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
    );

    if (response.data.status === "OK") {
      const firstResult = response.data.results[0];
      res.status(200).json({ data: firstResult }); // Send the first result back to the front-end
    } else {
      res.status(400).json({ error: "No results found" });
    }
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
