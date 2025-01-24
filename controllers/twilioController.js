require("dotenv").config();

const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

console.log("Twilio Service SID:", TWILIO_SERVICE_SID);
console.log("Twilio Account SID:", TWILIO_ACCOUNT_SID);
console.log("Twilio Auth Token:", TWILIO_AUTH_TOKEN);

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body;
  console.log(
    `sendOTP called with countryCode: ${countryCode}, phoneNumber: ${phoneNumber}`
  );

  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        from: "SolarGeeks",
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    console.log(
      `OTP sent successfully! Response: ${JSON.stringify(otpResponse)}`
    );
    res
      .status(200)
      .send(`OTP sent successfully! ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res.status(error?.status || 400).send({
      message:
        error?.status === 400
          ? `Phone number +${req.body.countryCode}${req.body.phoneNumber} is invalid`
          : error?.message || "Something went wrong!",
      status: error?.status || 400,
    });
  }
};

const verifyOTP = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body;
  console.log(
    `verifyOTP called with countryCode: ${countryCode}, phoneNumber: ${phoneNumber}, otp: ${otp}`
  );

  try {
    const verifiedResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
        channel: "sms",
      });

    // Approve verification for testing
    // await client.verify
    //   .services(TWILIO_SERVICE_SID)
    //   .verifications(phoneNumber)
    //   .update({ status: "approved" });

    const isVerified = verifiedResponse.status === "approved";
    console.log(`verifiedResponse status: ${verifiedResponse.status}`);
    console.log(`isVerified: ${isVerified}`);

    res.status(200).send({ isVerified });
  } catch (error) {
    console.error(`Error verifying OTP: ${error?.message}`);
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
