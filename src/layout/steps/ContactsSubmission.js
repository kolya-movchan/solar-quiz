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
      if (verificationResponse.data.isVerified === true) {
        onSubmit({ isQuizDataSubmitted: true });

        toast.success("Success! We will contact you soon.");
      } else {
        toast.error("Invalid confirmation code. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
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

  console.log("quizData", quizData);

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
    </Container>
  );
};
