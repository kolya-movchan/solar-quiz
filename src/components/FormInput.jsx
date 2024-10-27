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
        mask: "+38 (000)-000-00-00",
        lazy: true,
      };
      mask = IMask(inputRef.current, maskOptions);
      mask.on("accept", () => {
        const unmaskedValue = mask.unmaskedValue;
        if (unmaskedValue.length === 10) {
          onChange({ target: { name, value: mask.value } });
        }
      });
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
      }}
      className="form-input"
      name={name}
      // value={name === "phoneNumber" && !value ? "+1" : value}
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
