import React from "react";

export const BackButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="button back-btn">
      <img alt="arrow" src="/icons/left-arrow.svg" height={20} width={20} />
    </button>
  );
};
