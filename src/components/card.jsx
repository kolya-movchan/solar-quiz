import React from 'react'
import classNames from 'classnames';

export const Card = ({title, img, onClick, quizData, imgHeight, imgWidth, className='', classImg = "", containerPadding = "", isOneBg, isActive, isDisabled}) => {
  return (
    <div className={classNames(
      "card",
      {
        "card-active": isActive,
        "card-disabled": isDisabled && !isActive
      }
    )}>
      <button
        style={{
          zIndex: "3",
          paddingBottom: "0",
          fontSize: "2rem",
          fontWeight: "bold",
          border: isActive ? "1px solid transparent" : "1px solid #D2D2D2",
          borderRadius: "8px",
          cursor: "pointer",
          type: "button",
          overflow: "hidden",
          backgroundColor: isOneBg ? "#fff" : "transparent",
          ...className
        }}
        className={classNames(
          "card-button",
          {
            "card-button-padding": containerPadding,
          }
        )}
        onClick={() => {
        onClick(quizData)
        }}
      >

        <img style={{objectFit: "cover"}} src={img} alt="Own" height={imgHeight} width={imgWidth} className={classNames(
          {
            "card-icon-image": classImg === "card-icon-image",
            "card-img-own-home" : classImg === "card-img-own-home"
          }
        )} />

        <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
        }}
        className='card-content'
        >
      <span className='card-content-title'>{title}</span>
      </div>
      </button>
      </div>

  )
}
