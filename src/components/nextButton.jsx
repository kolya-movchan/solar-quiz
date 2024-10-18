import React from 'react'

export const NextButton = ({onClick, isDisabled}) => {
  return (
    <button
    style={{
      fontSize: "16px",
      border: "none",
      backgroundColor: isDisabled ? "grey" : "#FE4A19",
      borderRadius: "8px",
      color: "#fff",
      padding: "0 24px",
      display: "flex",  
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
      // fontWeight: "bold",
      height: "56px",
      boxSizing: "content-box",
      cursor: isDisabled ? "not-allowed" : "pointer",
      transition: "background-color 0.3s ease"
    }}
    className="next-btn"
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
  )
}
