import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Container } from "../../layout/container";
import { OTPModal } from "../../components/OTPModal";
import { QualificationBanner } from "../../components/QualificationBanner";
import { QualifiedBanner } from "../../components/QualifiedBanner";
import { Form } from "../../components/Form";

export const ContactsSubmission = ({
  quizData,
  locationCollection,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [showOTPInput, setShowOTPInput] = useState(false);
  // const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef([]);

  const validateInputs = (data) => {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      switch (key) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(data.email)) {
            toast.error("Please, enter a valid email address.");
            newErrors.email = "Please, enter a valid email address.";
          }
          break;
        case "phoneNumber":
          if (!/^\+\d{11,15}$/.test(data.phoneNumber)) {
            toast.error("Please, enter a valid phone number.");
            newErrors.phoneNumber = "Please, enter a valid phone number.";
          }
          break;
        default:
          break;
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "phoneNumber") {
      newValue = value.replace(/[^\d+]/g, "");
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber.length > 11
    );
  };

  const sendQuizDataWebhook = async () => {
    const {
      location,
      home_ownership,
      home_type,
      roof_condition,
      provider,
      mannual_provider,
      utility_bill_amount,
      credit_score,
    } = quizData;

    let { firstName, lastName, email, phoneNumber } = formData;
    let { streetAddress, city, zipCode, state } = locationCollection;

    // let firstName = "john";
    // let lastName = "doe";
    // let email = "john.doe@example.com";
    // let phoneNumber = "+1234567890";

    const toTitleCase = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const userIpAddress = ipResponse.data.ip;

    const dataToSend = {
      first_name: toTitleCase(firstName),
      last_name: toTitleCase(lastName),
      email,
      phone_number: phoneNumber,
      home_ownership: toTitleCase(home_ownership),
      home_type: toTitleCase(home_type),
      roof_condition: toTitleCase(roof_condition),
      provider: toTitleCase(provider || mannual_provider),
      utility_bill_amount,
      credit_score,
      zip_code: zipCode,
      full_address: toTitleCase(location),
      state,
      city,
      street_address: streetAddress,
      submission_date: new Date().toLocaleDateString("en-US"),
      ipAddress: userIpAddress,
    };

    console.log("data to send Webhook:", dataToSend);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/zapier-webhook`,
        { data: dataToSend }
      );

      console.log("response webhook:", response);

      // const TEST_dataToSendSolarCopilot = {
      //   campid: "SMARTENERGYGEEKS",
      //   First_Name: "Test",
      //   Last_Name: "Test",
      //   Email: "sdfsdf@gmail.com",
      //   Phone_1: "+12237293829",
      //   full_address: toTitleCase(location),
      //   Street_1: streetAddress,
      //   "Town/City": city,
      //   State: state,
      //   Postcode: "83728",
      //   Own_Rent: toTitleCase(home_ownership),
      //   Utility_Company: toTitleCase(provider || mannual_provider),
      //   Utility_Bill_Amount: utility_bill_amount,
      //   Home_Type: toTitleCase(home_type),
      //   Roof_Condition: toTitleCase(roof_condition),
      //   Credit_Score: credit_score,
      //   Source: "SmartEnergyGeeks",
      //   "IP Address": userIpAddress,
      // };

      const dataToSendSolarCopilot = {
        campid: "SMARTENERGYGEEKS",
        First_Name: toTitleCase(firstName),
        Last_Name: toTitleCase(lastName),
        Email: email,
        Phone_1: phoneNumber,
        full_address: toTitleCase(location),
        Street_1: streetAddress,
        "Town/City": city,
        State: state,
        Postcode: zipCode,
        Own_Rent: toTitleCase(home_ownership),
        Utility_Company: toTitleCase(provider || mannual_provider),
        Utility_Bill_Amount: utility_bill_amount,
        Home_Type: toTitleCase(home_type),
        Roof_Condition: toTitleCase(roof_condition),
        Credit_Score: credit_score,
        Source: "SmartEnergyGeeks",
        "IP Address": userIpAddress,
      };

      const responseFromSolarCopilot = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/solarcopilot`,
        { data: dataToSendSolarCopilot }
      );

      if (responseFromSolarCopilot.status === 200) {
        console.log("Response from SolarCopilot is successful.");
        const dataFromSolarCopilot =
          responseFromSolarCopilot.data.data.status === "Success"
            ? responseFromSolarCopilot.data.data.records[0]
            : null;
        console.log("Data from SolarCopilot:", dataFromSolarCopilot);
        const isSuccessfulReply = dataFromSolarCopilot;
        console.log("isSuccessfulReply:", isSuccessfulReply);

        const isBuyer = dataFromSolarCopilot.buyers.length > 0;
        console.log("isBuyer:", isBuyer);

        const isSold = isBuyer
          ? dataFromSolarCopilot.buyers[0].status === "Sold"
          : false;

        console.log("isSold:", isSold);

        const refId =
          isSuccessfulReply && isBuyer > 0 && isSold
            ? dataFromSolarCopilot.buyers[0].externalref
            : "-1";
        console.log("Reference ID:", refId);

        switch (refId) {
          case "1":
            console.log("Redirecting to High Roller Marketing");
            window.location.href =
              "https://smartenergygeeks.com/booking-call/1";
            break;
          case "2":
            console.log("Redirecting to Zach Sweety");
            window.location.href =
              "https://smartenergygeeks.com/booking-call/2";
            break;
          case "3":
            console.log("Redirecting to Mark Medina");
            window.location.href =
              "https://smartenergygeeks.com/booking-call/3";
            break;
          case "4":
            console.log("Redirecting to Alex Baird");
            window.location.href =
              "https://smartenergygeeks.com/booking-call/4";
            break;

          case "-1":
            console.log("Redirecting to Not Booked");
            window.location.href = "https://smartenergygeeks.com/not-booked";
            break;
          default:
            console.log("Redirecting to Not Booked Default", "refID:", refId);
            window.location.href = "https://smartenergygeeks.com/not-booked";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPVerification = async (e, isRetry = false) => {
    e.preventDefault();

    const validationErrors = validateInputs(formData);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    const countryCode = formData.phoneNumber.trim().slice(1, -10);
    const phoneNumber = formData.phoneNumber.trim().slice(-10);

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/send-otp`,
        {
          countryCode,
          phoneNumber,
        }
      );

      if (response.status === 200) {
        setShowOTPInput(true);
      }

      setShowOTPInput(true);
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmission = async () => {
    try {
      const verificationResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/verify-otp`,
        {
          countryCode: formData.phoneNumber.trim().slice(1, -10),
          phoneNumber: formData.phoneNumber.trim().slice(-10),
          otp: otpRefs.current.map((ref) => ref.value).join(""),
        }
      );
      // const verificationResponse = {
      //   data: {
      //     isVerified: true,
      //   },
      // };

      if (verificationResponse.data.isVerified === true) {
        setTimeout(() => {
          setShowOTPInput(false);
          setIsSending(true);
        }, 500);
        onSubmit({ isQuizDataSubmitted: true });
        await sendQuizDataWebhook();
        toast.success("Success! We will contact you soon!");
        setIsSending(false);
      } else {
        toast.error("Invalid confirmation code. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }

    otpRefs.current[index].value = value;

    if (index === 3 && otpRefs.current.every((ref) => ref.value)) {
      handleOTPSubmission();
    }
  };

  useEffect(() => {
    if (showOTPInput) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showOTPInput]);

  // useEffect(() => {
  //   sendQuizDataWebhook();
  // }, []);

  useEffect(() => {
    const fetchAndLogData = async () => {
      const {
        location,
        home_ownership,
        home_type,
        roof_condition,
        provider,
        mannual_provider,
        utility_bill_amount,
        credit_score,
      } = quizData;

      let { firstName, lastName, email, phoneNumber } = formData;
      let { streetAddress, city, zipCode, state } = locationCollection;

      const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

      const fetchUserIpAddress = async () => {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        return ipResponse.data.ip;
      };

      const userIpAddress = await fetchUserIpAddress();

      console.log("Data for LeadBy:", {
        campid: "SMARTENERGYGEEKS",
        First_Name: toTitleCase(firstName),
        Last_Name: toTitleCase(lastName),
        Email: email,
        Phone_1: phoneNumber,
        full_address: toTitleCase(location),
        Street_1: streetAddress,
        "Town/City": city,
        State: state,
        Postcode: zipCode,
        Own_Rent: toTitleCase(home_ownership),
        Utility_Company: toTitleCase(provider || mannual_provider),
        Utility_Bill_Amount: utility_bill_amount,
        Home_Type: toTitleCase(home_type),
        Roof_Condition: toTitleCase(roof_condition),
        Credit_Score: credit_score,
        Source: "SmartEnergyGeeks",
        "IP Address": userIpAddress,
      });
    };

    fetchAndLogData();
  }, [quizData, formData, locationCollection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      className="container submission-container"
      style={{
        boxSizing: "border-box",
      }}
    >
      <QualificationBanner style={{ marginBottom: "16px" }} />

      <h1
        style={{ margin: "0", marginBottom: "16px", maxWidth: "450px" }}
        className="title"
      >
        Where should we send your report?
      </h1>

      <p className="submission-description">
        See how much money you could save with this $0-down solar program that
        cuts electric bills by 30-50% – instantly.
      </p>

      <QualifiedBanner />

      <Form
        handleOTPVerification={handleOTPVerification}
        formData={formData}
        handleInputChange={handleInputChange}
        isFormValid={isFormValid}
        isLoading={isLoading}
      />

      {showOTPInput && (
        <OTPModal
          setShowOTPInput={setShowOTPInput}
          formData={formData}
          handleOTPSubmission={handleOTPSubmission}
          handleOTPChange={handleOTPChange}
          otpRefs={otpRefs}
          handleOTPVerification={handleOTPVerification}
        />
      )}

      {isSending && (
        <div
          className="loader-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #f3f3f3",
              borderTop: "5px solid #fe4a19",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
          </style>
        </div>
      )}
    </Container>
  );
};
