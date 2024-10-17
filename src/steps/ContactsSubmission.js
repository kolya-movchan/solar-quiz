import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";

import { InputOTP } from "../components/input-otp";

export const ContactsSubmission = ({ quizData, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
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
      formData.phoneNumber.length > 9
    );
  };

  const handleOTPVerification = async (e) => {
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
      const response = await axios.post(
        `https://${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/send-otp`,
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
          ? error.response.data
          : "Something went wrong. Please try again later."
      );
    }
  };

  const handleOTPSubmission = async () => {
    try {
      const verificationResponse = await axios.post(
        `https://${process.env.REACT_APP_BACKEND_HOST}/twilio-sms/verify-otp`,
        {
          countryCode: formData.phoneNumber.trim().slice(1, -10),
          phoneNumber: formData.phoneNumber.trim().slice(-10),
          otp: otp.join(""),
        }
      );
      if (verificationResponse.data.isVerified === true) {
        console.log("Verification Response:", verificationResponse);
        onSubmit({ isQuizDataSubmitted: true });
        toast.success("Success! We will contact you soon.");
        // handleSubmit();
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
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showOTPInput) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showOTPInput]);

  useEffect(() => {
    console.log("OTP:", otp);
    console.log("OTP Length:", otp.length);
    console.log("OTP Submitted:", isOTPSubmitted);

    if (
      otp.length === 4 &&
      otp.every((digit) => digit !== "") &&
      !isOTPSubmitted
    ) {
      handleOTPSubmission();
    }
  }, [otp, isOTPSubmitted]);

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "40px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(to right, #FE4A19, #982C0F) border-box",
            color: "#313149",
            padding: "10px",
            border: "1px solid transparent",
            borderRadius: "55px",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "4px",
              paddingBottom: "4px",
              display: "flex",
              alignItems: "center",
              margin: "0",
              gap: "8px",
            }}
          >
            <img
              src="/icons/checkmark.svg"
              alt="Checkmark"
              style={{
                width: "20px",
                height: "20px",
                margin: "0",
                marginTop: "2px",
              }}
            />

            <span
              style={{ fontWeight: "500", fontSize: "14px", color: "#FE4A19" }}
            >
              Free Home Solar Design – Requested by 
              <span style={{ fontWeight: 800 }}>180,000+</span> Homeowners
            </span>
          </p>
        </div>
        <h1 style={{ fontSize: "3rem", margin: "0", marginBottom: "25px" }}>
          One more step...
        </h1>
        <p
          style={{
            marginBottom: "20px",
            color: "#475467",
            maxWidth: "410px",
            lineHeight: "27px",
            marginTop: "0",
          }}
        >
          Amazing!!! Now we can calculate how much you could save with 
          <strong style={{ fontWeight: 650 }}>$0 Solar Program</strong> and
          share it with you shortly. Let us know where we can share your
          calculations and the new roof design. 
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            padding: "15px",
            border: "1px solid #027A48",
            backgroundColor: "#E0ECE2",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#027A48" }}>Your home status:</span>
          <span style={{ fontWeight: "bold", color: "#027A48" }}>
            Pre-Qualified
          </span>
          <img
            src="/icons/alert-circle.svg"
            alt="Info"
            style={{ width: "20px" }}
          />
        </div>

        <div style={{ width: "100%" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              gap: "10px",
              margin: "0 auto",
              padding: "0 80px",
              maxWidth: "320px",
            }}
            onSubmit={handleOTPVerification}
            novalidate
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="First Name*"
                style={{
                  padding: "15px 10px",
                  width: "100%",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  outline: "none",
                }}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Last Name*"
                style={{
                  padding: "15px 10px",
                  width: "100%",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  outline: "none",
                }}
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="email"
              placeholder="Email*"
              style={{
                padding: "15px 10px",
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                outline: "none",
              }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              placeholder="Phone Number*"
              style={{
                padding: "15px 10px",
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                outline: "none",
              }}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onFocus={(e) => {
                const newValue = "+1";
                handleInputChange({
                  target: { name: e.target.name, value: newValue },
                });
              }}
            />

            <p
              style={{
                textAlign: "left",
                fontSize: "12px",
                color: "#475467",
                margin: "0",
              }}
            >
              We'll text you to confirm your number. Standard message and data
              rates apply.{" "}
            </p>

            <button
              style={{
                border: "none",
                backgroundColor: isFormValid() ? "#FE4A19" : "#ccc",
                color: "#fff",
                cursor: isFormValid() ? "pointer" : "not-allowed",
                padding: "10px 20px",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                height: "20px",
                boxSizing: "content-box",
                textAlign: "center",
                display: "flex",
                gap: "10px",
              }}
              type="submit"
              disabled={!isFormValid()}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span>Confirm My Request</span>
              )}

              <img
                src="/icons/right-arrow.png"
                alt="Right Arrow"
                height={16}
                width={16}
              />
            </button>
          </form>

          <p style={{ fontSize: "0.8rem" }}>
            Your data is secured by our{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Privacy policies
            </a>
          </p>
        </div>
      </div>

      {showOTPInput && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "16px 16px 60px 16px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              width: "450px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingBottom: "10px",
              }}
            >
              <div></div>
              <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "650" }}>
                Phone Number Verification
              </h2>

              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "24px",
                  height: "24px",
                }}
                onClick={() => setShowOTPInput(false)}
              >
                <img src="/icons/close.svg" alt="Close" />
              </button>
            </div>

            <div
              style={{
                width: "110%",
                height: "1px",
                backgroundColor: "#EAECF0",
                marginBottom: "30px",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
                padding: "0 20px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "32px" }}>
                Confirm your Request
              </h3>
              <p
                style={{
                  margin: "0",
                  color: "#475467",
                  lineHeight: "27px",
                  fontSize: "18px",
                }}
              >
                We sent a 4-digit personal code to the{" "}
                <span style={{ fontWeight: "bold" }}>
                  {formData.phoneNumber}
                </span>
                . This helps us to verify your request. Enter the code below:
              </p>
            </div>

            <form
              onSubmit={handleOTPSubmission}
              style={{ marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <InputOTP
                      key={index}
                      value={otp[index] || ""}
                      onChange={(e) => handleOTPChange(e, index)}
                      ref={(el) => (otpRefs.current[index] = el)}
                    />
                  ))}
              </div>
            </form>

            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "18px",
                marginBottom: "10px",
                padding: "0 20px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  width: "max-content",
                  color: "#475467",
                }}
              >
                Didn’t get a code?
              </p>

              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#98A2B3",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                Resend the code (59)
              </button>
            </div>

            <a
              href="/privacy-policy"
              style={{
                margin: "0",
                width: "max-content",
                padding: "0 20px",
                color: "#475467",
                fontSize: "16px",
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      )}
    </>
  );
};
