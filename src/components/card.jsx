import React from 'react'

export const Card = ({title, img, onClick, quizData, imgHeight, imgWidth, containerPadding, isOneBg, className}) => {
  return (
    <button
    style={{
      padding: containerPadding,
      zIndex: "2",
      paddingBottom: "0",
      width: "300px",
      fontSize: "2rem",
      fontWeight: "bold",
      border: "1px solid #D2D2D2",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      type: "button",
      overflow: "hidden",
      backgroundColor: isOneBg ? "#fff" : "transparent",
      ...className
    }}
    onClick={() => onClick(quizData)}
  >

      <img style={{marginBottom: "10px", objectFit: "cover"}} src={img} alt="Own" height={imgHeight} width={imgWidth} />


    <div
      style={{
        padding: "15px 20px 15px",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "20px" }}>{title}</span>
    </div>
  </button>
  )
}
