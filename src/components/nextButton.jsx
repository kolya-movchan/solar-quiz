import React from 'react'

export const NextButton = ({onClick}) => {
  return (
    <button
    style={{
      border: "none",
      backgroundColor: "#000",
      color: "#fff",
      cursor: "pointer",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      height: "20px",
      width: "80px",
      boxSizing: "content-box",
    }}
    type="button"
    onClick={onClick}
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
