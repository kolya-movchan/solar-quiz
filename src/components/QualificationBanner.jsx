import React from "react";

export const QualificationBanner = () => {
  return (
    <div
      className="qualification-container"
      style={{
        background:
          "#FE4A191A",
        color: "#313149",
        padding: "4px 20px",
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
          padding: "0",
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
          className="qualification-banner"
          style={{
            fontWeight: "500",
            margin: "0",
            fontSize: "14px",
            color: "#FE4A19",
            textAlign: "left",
            lineHeight: "21px",
            padding: "0",
          }}
        >
          {/* Free Home Solar Design{" "} */}
          {/* <span className="qualification-banner-dash">–</span>{" "} */}
          <span>
            Requested by 180,000+ homeowners
            {/* <span style={{ fontWeight: 700 }}>180,000+</span> Homeowners */}
          </span>
        </p>
      </p>
    </div>
  );
};
