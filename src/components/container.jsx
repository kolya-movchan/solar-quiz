import React from "react";

export const Container = ({ isVisible, children }) => {
  return (
    <div
      className="container intro-container"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
};
