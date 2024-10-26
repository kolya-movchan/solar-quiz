import React from "react";
import classNames from "classnames";

export const Card = ({
  title,
  img,
  onClick,
  quizData,
  imgHeight,
  imgWidth,
  style = "",
  classImg = "",
  containerPadding = "",
  isOneBg,
  isActive,
  isDisabled,
}) => {
  return (
    <div
      className={classNames("card", {
        "card-active": isActive,
        // "card-disabled": isDisabled && !isActive,
      })}
    >
      <button
        style={{
          zIndex: "3",
          // paddingBottom: "0",
          fontSize: "2rem",
          fontWeight: "bold",
          borderRadius: "4px",
          cursor: "pointer",
          type: "button",
          overflow: "hidden",
          backgroundColor: isOneBg ? "#fff" : "transparent",
          ...style,
        }}
        className={classNames("card-button", {
          "card-button-padding": containerPadding,
          "card-emojie": classImg === "card-emojie",
        })}
        onClick={() => {
          onClick(quizData);
        }}
      >
        {/* <div> */}
          <img
            style={{ objectFit: "cover" }}
            src={img}
            alt="Own"
            height={imgHeight}
            width={imgWidth}
            className={classNames({
              "card-icon-image": classImg === "card-icon-image",
              "card-img-own-home": classImg === "card-img-own-home",
              "card-img-roof-condition": classImg === "card-img-roof-condition",
              "card-emojie-img": classImg === "card-emojie",
            })}
          />
        {/* </div> */}

        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
          }}
          className="card-content"
        >
          <span className="card-content-title">{title}</span>
        </div>
      </button>
    </div>
  );
};
