import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Container } from "../../layout/container";
import { OTPModal } from "../../components/OTPModal";
import { QualificationBanner } from "../../components/QualificationBanner";
import { QualifiedBanner } from "../../components/QualifiedBanner";
import { Form } from "../../components/Form";
export const ContactsSubmission = ({ quizData, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState([]);
  const [isOTPSubmitted, setIsOTPSubmitted] = useState(false);
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

  // const handleSubmit = () => {
  //   setIsLoading(true);

  //   const {
  //     home_ownership,
  //     home_type,
  //     roof_condition,
  //     provider,
  //     utility_bill_amount,
  //     credit_score,
  //   } = quizData;

  //   const data = {
  //     ...formData,
  //     home_ownership,
  //     home_type,
  //     roof_condition,
  //     provider,
  //     utility_bill_amount,
  //     credit_score,
  //   };

  //   axios.post(``, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       return response.text();
  //     })
  //     .then(() => {
  //       onSubmit({ isQuizDataSubmitted: true });
  //       toast.success("Success! We will contact you soon.");
  //     }) // Log the response
  //     .catch((error) => {
  //       toast.error("Something went wrong. Please try again later.");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber.length > 11
    );
  };

  const handleOTPVerification = async (e, isRetry = false) => {
    e.preventDefault(); // Prevent page reload

    const validationErrors = validateInputs(formData);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    const countryCode = formData.phoneNumber.trim().slice(1, -10);
    const phoneNumber = formData.phoneNumber.trim().slice(-10);

    console.log("Phone Number:", phoneNumber);
    console.log("Country Code:", countryCode);
    try {
      setIsLoading(true);

      // const response = await axios.post(
      //   `https://${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/send-otp`,
      //   {
      //     countryCode,
      //     phoneNumber,
      //   }
      // );

      // if (response.status === 200) {
      //   setShowOTPInput(true);
      // }
      setShowOTPInput(true);

      // if (isRetry) {
      //   setResendTimer(60);
      // }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmission = async () => {
    try {
      // setIsOTPSubmitted(true);
      const verificationResponse = await axios.post(
        // `http://localhost:3001/twilio-sms/verify-otp`,
        `https://${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/verify-otp`,
        {
          countryCode: formData.phoneNumber.trim().slice(1, -10),
          phoneNumber: formData.phoneNumber.trim().slice(-10),
          otp: otp.join(""),
        }
      );
      if (verificationResponse.data.isVerified === true) {
        console.log("Verification Response:", verificationResponse);
        // handleSubmit();
        onSubmit({ isQuizDataSubmitted: true });
        setIsOTPSubmitted(true);

        toast.success("Success! We will contact you soon.");
      } else {
        toast.error("Invalid confirmation code. Please try again.");
        setIsOTPSubmitted(false);
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later."
      );
      setIsOTPSubmitted(false);
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
  };

  useEffect(() => {
    if (showOTPInput) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showOTPInput]);

  useEffect(() => {
    // console.log("OTP:", otp);
    // console.log("OTP Length:", otp.length);
    // console.log("OTP Submitted:", isOTPSubmitted);

    if (
      otp.length === 4 &&
      otp.every((digit) => digit !== "") &&
      !isOTPSubmitted
    ) {
      handleOTPSubmission();
    }
  }, [otp, isOTPSubmitted]);

  // useEffect(() => {
  //   let interval;
  //   if (resendTimer > 0) {
  //     interval = setInterval(() => {
  //       setResendTimer((prev) => prev - 1);
  //     }, 1000);
  //   } else if (resendTimer === 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [resendTimer]);

  return (
    <Container
      className="container submission-container"
      style={{
        boxSizing: "border-box",
      }}
    >
      <QualificationBanner />

      <h1 style={{ margin: "0", marginBottom: "16px" }} className="title">
        One more step...
      </h1>

      <p className="submission-description">
        Amazing!!! Now we can calculate how much you could save with 
        <strong style={{ fontWeight: 650 }}>$0 Solar Program</strong> and share
        it with you shortly. Let us know where we can share your calculations
        and the new roof design. 
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
          handleOTPSubmission={() => {}}
          // handleOTPSubmission={handleOTPSubmission}
          handleOTPChange={() => {}}
          // handleOTPChange={handleOTPChange}
          otp={otp}
          otpRefs={otpRefs}
          handleOTPVerification={() => {}}
          // handleOTPVerification={handleOTPVerification}
        />
      )}
    </Container>
  );
};
