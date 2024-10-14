import React from 'react'

export const NextButton = ({onClick, isDisabled}) => {
  return (
    <button
    style={{
      border: "none",
      backgroundColor: isDisabled ? "grey" : "#FE4A19",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      padding: "12px 24px",
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      height: "20px",
      boxSizing: "content-box",
      cursor: isDisabled ? "not-allowed" : "pointer"
    }}
    type="button"
    onClick={onClick}
    disabled={isDisabled}
  >
    <span>Next</span>

    <img
      alt="arrow"
      src="/icons/right-arrow.png"
      height={20}
      width={20}
    />
  </button>
  )
}
