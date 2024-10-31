import React, { useRef, useEffect } from "react";
import { OTPInput } from "./OTPInput";

export const OTPModal = ({
  setShowOTPInput,
  formData,
  handleOTPSubmission,
  handleOTPChange,
  otpRefs,
  handleOTPVerification,
}) => {
  const firstInputRef = useRef(null);

  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste action
    const pastedData = event.clipboardData.getData("Text").slice(0, 4); // Handle 4 digits
    handleAutoCompleteOrPaste(pastedData);
  };

  const handleAutoCompleteOrPaste = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (otpRefs.current[i]) {
        otpRefs.current[i].value = data[i];
        setTimeout(() => {
          handleOTPChange({ target: { value: data[i] } }, i);
        }, 100);
      }
    }

    // Focus on the last input after autofill or paste
    if (otpRefs.current[data.length - 1]) {
      otpRefs.current[data.length - 1].focus();
    }
  };

  useEffect(() => {
    const handleKeyUp = (e, index) => {
      if (e.target.value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    };

    otpRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("keyup", (e) => handleKeyUp(e, index));
      }
    });

    return () => {
      otpRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.removeEventListener("keyup", (e) => handleKeyUp(e, index));
        }
      });
    };
  }, []);

  // Use this effect to handle Chrome's autofill event for OTP
  useEffect(() => {
    const handleInputEvent = (e) => {
      // Check if Chrome autofills the entire OTP in the first field
      if (e.target.value.length > 1) {
        handleAutoCompleteOrPaste(e.target.value);
      }
    };

    if (firstInputRef.current) {
      firstInputRef.current.addEventListener("input", handleInputEvent);
    }

    return () => {
      if (firstInputRef.current) {
        firstInputRef.current.removeEventListener("input", handleInputEvent);
      }
    };
  }, []);

  formData.phoneNumber = "+12737464648";

  return (
    <div className="otp-modal" style={{ zIndex: 1000 }}>
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
          <h3 style={{ margin: "0", fontSize: "32px" }} className="title">
            Confirm My Request
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
            <span style={{ fontWeight: "bold" }}>{formData.phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "1 ($2) $3-$4")}</span>.
            This allows us to verify your request. Enter the code below:
          </p>
        </div>

        <form onSubmit={handleOTPSubmission} style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
            onPaste={handlePaste}
          >
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <OTPInput
                  key={index}
                  index={index}
                  onChange={(e) => handleOTPChange(e, index)}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                    if (index === 0) firstInputRef.current = el;
                  }}
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

        {/* <a
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
        </a> */}
      </div>
    </div>
  );
};
