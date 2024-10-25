import React from "react";

export const StartButton = ({ onClick, className }) => {
  return (
    <button
      className={`${className} button start-btn`}
      type="button"
      onClick={onClick}
    >
      <span>Start</span>
      <img
        style={{ marginTop: "2px" }}
        alt="arrow"
        src="/icons/right-arrow.png"
        height={20}
        width={20}
      />
    </button>
  );
};
