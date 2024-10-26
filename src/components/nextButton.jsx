import React from "react";
import classNames from "classnames";

export const NextButton = ({ onClick, isDisabled }) => {
  return (
    <button
      className={classNames("button next-btn", {
        disabled: isDisabled,
      })}
      style={{
        // backgroundColor: isDisabled ? "grey" : "#FE4A19",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      <span>Next</span>

      <img
        alt="arrow"
        src="/icons/right-arrow.png"
        height={16}
        width={16}
        style={{
          marginTop: "2px",
        }}
      />
    </button>
  );
};
