import React from "react";

export const FormInput = ({ placeholder, type = "text", name, value, onChange, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        ...style,
        padding: "20px 10px",
        border: "1px solid #D0D5DD",
        borderRadius: "4px",
        outline: "none",
      }}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={(e) => {
        if (name === 'phoneNumber' && !value) {
          const newValue = "+1";
          onChange({
            target: { name: e.target.name, value: newValue },
          });
        }
      }}
    />
  );
};
