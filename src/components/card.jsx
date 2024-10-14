import React from 'react'

export const Card = ({title, img, onClick, quizData}) => {
  return (
    <button
    style={{
      padding: "20px 20px 0px 20px",
      zIndex: "2",
      paddingBottom: "0",
      width: "100%",
      fontSize: "2rem",
      fontWeight: "bold",
      border: "1px solid #D2D2D2",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      cursor: "pointer",
      type: "button",
      overflow: "hidden",
    }}
    onClick={() => onClick(quizData)}
  >
    <div style={{paddingBottom: "10px"}}>
      <img src={img} alt="Own" height={40} width={40} />
    </div>

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
