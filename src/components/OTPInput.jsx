import React, { useState, forwardRef } from "react";

export const OTPInput = forwardRef(({ index, value, onChange }, ref) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setInputValue(newValue);
    onChange({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div
      style={{
        height: "80px",
        width: "80px",
        border: "1px solid #D0D5DD",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        style={{
          height: "80%",
          width: "80%",
          border: "none",
          outline: "none",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
        value={inputValue}
        onChange={handleChange}
        maxLength="1" // Change maxLength to 1 to ensure each input only takes one digit
        autoComplete="one-time-code" // Use the same autoComplete value for all inputs
        name={`otp-${index}`} // Unique name for each input
      />
    </div>
  );
});
