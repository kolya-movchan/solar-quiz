import React from 'react'

export const BackButton = ({onClick}) => {
  return (
    <button
    type="button"
    onClick={onClick}
    style={{
      border: "1px solid #000",
      backgroundColor: "transparent",
      cursor: "pointer",
      padding: "0 24px",
      height: "48px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      alt="arrow"
      src="/icons/left-arrow.svg"
      height={20}
      width={20}
    />
  </button>
  )
}
