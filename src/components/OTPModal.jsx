import React, { useEffect, useState, useRef } from "react";
import { OTPInput } from "./OTPInput";

export const OTPModal = ({
  setShowOTPInput,
  formData,
  handleOTPSubmission,
  handleOTPChange,
  otp,
  otpRefs,
  handleOTPVerification,
}) => {
  const [autofilledOTP, setAutofilledOTP] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (otpRefs.current[0]) {
      setTimeout(() => otpRefs.current[0].focus(), 100); // Delay to ensure DOM is ready
    }

    // Autofill OTP on mobile devices using the OTPCredential API
    if ("OTPCredential" in window) {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: AbortSignal.timeout(120000), // Timeout in 2 minutes
        })
        .then((otp) => {
          if (otp && otp.code) {
            setAutofilledOTP(otp.code);
            autofillOTPInputs(otp.code);
          }
        })
        .catch((err) => {
          console.error("Error getting OTP", err);
        });
    }
  }, []);

  const autofillOTPInputs = (code) => {
    // Automatically insert OTP into inputs
    for (let i = 0; i < code.length; i++) {
      if (otpRefs.current[i]) {
        otpRefs.current[i].value = code[i];
        handleOTPChange({ target: { value: code[i] } }, i);
      }
    }
  };

  useEffect(() => {
    if (autofilledOTP) {
      autofillOTPInputs(autofilledOTP);
    }
  }, [autofilledOTP]);

  return (
    <div className="otp-modal">
      <div className="otp-container">
        <div className="otp-wrapper">
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

        <div className="otp-title-container">
          <h3 style={{ margin: "0" }} className="title">
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
            <span style={{ fontWeight: "bold" }}>{formData.phoneNumber}</span>.
            This helps us verify your request. Enter the code below:
          </p>
        </div>

        <form onSubmit={handleOTPSubmission} style={{ marginBottom: "20px" }}>
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
                <OTPInput
                  key={index}
                  value={otp[index] || ""}
                  onChange={(e) => handleOTPChange(e, index)}
                  ref={(el) => (otpRefs.current[index] = el)}
                />
              ))}
          </div>
        </form>

        <div className="resend-otp-container">
          <p style={{ margin: "0", width: "max-content", color: "#475467" }}>
            Didn't get a code?
          </p>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              width: "max-content",
              fontSize: "18px",
              color: "#98A2B3",
              fontWeight: "700",
              textDecoration: "underline",
            }}
            onClick={(e) => handleOTPVerification(e, true)}
          >
            Resend the code
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
  );
};
