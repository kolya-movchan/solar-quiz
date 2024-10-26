import React, { useEffect, useRef } from "react";
import IMask from "imask";

export const FormInput = ({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  style,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    let mask;
    if (name === "phoneNumber") {
      const maskOptions = {
        mask: "+1 (000) 000-0000",
        lazy: false,
      };
      mask = IMask(inputRef.current, maskOptions);
      mask.on("accept", () => {
        const unmaskedValue = mask.unmaskedValue;
        if (unmaskedValue.length === 10) {
          onChange({ target: { name, value: mask.value } });
        }
      });
    } else if (name === "email") {
      const maskOptions = {
        mask: function (value) {
          if (/^[a-z0-9_\.-]+$/.test(value)) return true;
          if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
          if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
          if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
          if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
          if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
            return true;
          if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
            return true;
          return false;
        },
        lazy: false,
      };
      mask = IMask(inputRef.current, maskOptions);
    }

    return () => {
      if (mask) {
        mask.destroy();
      }
    };
  }, [name, onChange]);

  return (
    <input
      ref={inputRef}
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
      onChange={(e) => {
        const { selectionStart, selectionEnd } = e.target;
        onChange(e);
        setTimeout(() => {
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }, 0);
      }}
      onFocus={(e) => {
        if (name === "phoneNumber" && !value) {
          const newValue = "+1";
          onChange({
            target: { name: e.target.name, value: newValue },
          });
        }
      }}
    />
  );
};
