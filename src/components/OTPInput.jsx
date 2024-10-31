import React, { useState, forwardRef } from "react";

export const OTPInput = forwardRef(({ index, value, onChange }, ref) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setInputValue(newValue);
    onChange({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div
      className="otp-input-container"
      style={{
        height: "80px",
        width: "80px",
        border: isFocused ? "1px solid #fe4a19" : "1px solid #D0D5DD",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        className="otp-input"
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength="4"
        autoComplete="one-time-code"
        name={`otp-${index}`}
      />
    </div>
  );
});
