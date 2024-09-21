import React, { useEffect, useState } from "react";

export const Step8 = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        height: "77vh",
      }}
    >
      <div
        style={{
          border: "1px solid #000",
          marginBottom: "40px",
          borderRadius: "16px",
        }}
      >
        <p
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            display: "flex",
            alignItems: "center",
            margin: "0",
          }}
        >
          <img
            src="/icons/checkmark.svg"
            alt="Checkmark"
            style={{ width: "20px", height: "20px", margin: "10px" }}
          />

          <span style={{ fontWeight: "500" }}>
            Free Home Solar Design – Requested by 180,000+ Homeowners
          </span>
        </p>
      </div>
      <h1 style={{ fontSize: "3rem", margin: "0", marginBottom: "25px" }}>
        One more step...
      </h1>
      <p style={{ marginBottom: "40px" }}>
        Amazing!!! Now we can calculate how much you could save with 
        <strong>$0 Solar Program</strong> and share it with you shortly. Let us
        know where we can share your calculations and the new roof design. 
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "15px",
          border: "1px solid #000",
          marginBottom: "30px",
        }}
      >
        <span>Your home status</span>
        <span style={{ fontWeight: "bold" }}>Pre-Qualified</span>
        <img src="/icons/info.svg" alt="Info" style={{ width: "20px" }} />
      </div>

      <div style={{ width: "55%" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Full Name*"
            style={{ padding: "10px" }}
          />
          <input type="text" placeholder="Email*" style={{ padding: "10px" }} />
          <input
            type="text"
            placeholder="Phone Number*"
            style={{ padding: "10px" }}
          />

          <button
            style={{
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              height: "20px",
              boxSizing: "content-box",
              textAlign: "center",
            }}
            type="button"
            onClick={handleSubmit}
          >
            <span>Get Free Solar Design</span>
          </button>
        </form>

        <p style={{ fontSize: "0.8rem" }}>
          Your data is secure by our <a href="/privacy-policy">Privacy policies</a>
        </p>
      </div>
    </div>
  );
};
