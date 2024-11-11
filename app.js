const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

const twilioRouter = require("./routes/twilioRoutes");
const apiRouter = require("./routes/googleApiRoutes");
const emailRouter = require("./routes/emailRoutes");
const axios = require("axios");
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("GOOGLE_MAPS_API_KEY:", process.env.GOOGLE_MAPS_API_KEY);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

const corsOptions = {
  origin: "*", // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/twilio-sms", twilioRouter);
app.post("/api/zapier-webhook", async (req, res) => {
  const { data } = req.body;

  try {
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/4525203/21zk4op/",
      data
    );

    console.log("response", response.data);

    if (response.data.status === "success") {
      res.status(200).json({ status: "Success" });
    } else {
      res.status(400).json({ status: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error" });
  }
});
app.use("/api", apiRouter);
app.use("/send-email", emailRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
