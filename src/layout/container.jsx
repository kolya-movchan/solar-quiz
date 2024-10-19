import React from "react";
import { useVisibility } from "../hooks/useVisibility";

export const Container = ({ className, children }) => {
  const isVisible = useVisibility(100);

  return (
    <div
      className={`container ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
};
