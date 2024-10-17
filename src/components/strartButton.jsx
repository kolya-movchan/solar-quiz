import React from 'react'

export const StartButton = ({onClick, className}) => {
  return (
    <button
    style={{
      width: "100%",
      fontSize: "16px",
      height: "56px",
      border: "none",
      backgroundColor: "#FE4A19",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      padding: "0 24px",
      gap: "10px",
      fontWeight: "bold",
      boxSizing: "content-box",
    }}
    className={className}
    type="button"
    onClick={onClick}
  >
    <span>Start</span>

    <img
      alt="arrow"
      src="/icons/right-arrow.png"
      height={20}
      width={20}
    />
  </button>
  )
}
