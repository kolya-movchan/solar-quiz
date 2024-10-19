import React from "react";

import { FormInput } from "./FormInput";

export const Form = ({
  handleOTPVerification,
  formData,
  handleInputChange,
  isFormValid,
  isLoading,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <form
        className="contact-form"
        style={{ marginBottom: "15px" }}
        onSubmit={handleOTPVerification}
        novalidate
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <FormInput
            style={{ width: "100%" }}
            placeholder="First Name*"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <FormInput
            style={{ width: "100%" }}
            placeholder="Last Name*"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <FormInput
          placeholder="Email*"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <FormInput
          type="tel"
          placeholder="Phone Number*"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <button
          style={{
            border: "none",
            backgroundColor: isFormValid() ? "#FE4A19" : "#ccc",
            color: "#fff",
            cursor: isFormValid() ? "pointer" : "not-allowed",
            padding: "0 24px",
            height: "56px",
            boxSizing: "content-box",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            gap: "10px",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          type="submit"
          disabled={!isFormValid()}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>Confirm Solar Report Request</span>
          )}

          <img
            src="/icons/right-arrow.png"
            alt="Right Arrow"
            height={16}
            width={16}
          />
        </button>
      </form>

      <p style={{ fontSize: "0.8rem", margin: "0", color: "#475467" }}>
        Your data is secured by our{" "}
        <a href="/privacy-policy" style={{ color: "#000", fontWeight: "bold" }}>
          Privacy policies
        </a>
      </p>
    </div>
  );
};
