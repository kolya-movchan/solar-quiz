import React from 'react'

export const StartButton = ({onClick}) => {
  return (
    <button
    style={{
      border: "none",
      backgroundColor: "#FE4A19",
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
    }}
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
