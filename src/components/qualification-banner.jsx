import React from "react";

export const QualificationBanner = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(#fff 0 0) padding-box, linear-gradient(to right, #FE4A19, #982C0F) border-box",
        color: "#313149",
        padding: "5px 10px",
        border: "1px solid transparent",
        borderRadius: "55px",
        display: "inline-block",
        marginBottom: "32px",
      }}
    >
      <p
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          display: "flex",
          alignItems: "center",
          margin: "0",
          gap: "8px",
        }}
      >
        <img
          src="/icons/checkmark.svg"
          alt="Checkmark"
          style={{
            width: "20px",
            height: "20px",
            margin: "0",
            marginTop: "2px",
          }}
        />

        <p
          style={{
            fontWeight: "500",
            margin: "0",
            fontSize: "14px",
            color: "#FE4A19",
            textAlign: "left",
            lineHeight: "21px",
          }}
        >
          Free Home Solar Design – Requested by 
          <span style={{ fontWeight: 800 }}>180,000+</span> Homeowners
        </p>
      </p>
    </div>
  );
};
