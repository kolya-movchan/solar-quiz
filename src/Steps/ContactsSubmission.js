import React, { useEffect, useState } from "react";
import "../App.css";

import { toast } from "react-toastify";

export const ContactsSubmission = ({ quizData, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const validateInputs = (data) => {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      switch (key) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(data.email)) {
            toast.error("Please, enter a valid email address.");
            newErrors.email = "Please, enter a valid email address.";
          }
          break;
        case "phoneNumber":
          if (!/^\+?[0-9]{10,15}$/.test(data.phoneNumber)) {
            toast.error("Please, enter a valid phone number.");
            newErrors.phoneNumber = "Please, enter a valid phone number.";
          }
          break;
        default:
          break;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const {
      home_ownership,
      home_type,
      roof_condition,
      provider,
      utility_bill_amount,
      credit_score,
    } = quizData;

    const data = {
      ...formData,
      home_ownership,
      home_type,
      roof_condition,
      provider,
      utility_bill_amount,
      credit_score,
    };

    const validationErrors = validateInputs(data);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    fetch(`https://solar-quiz-backend.vercel.app/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type
      },
      body: JSON.stringify(data), // Stringify the data object
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("form submission frontend response", response);

        return response.text(); // Change to text if your backend returns a string
      })
      .then(() => {
        onSubmit({ isQuizDataSubmitted: true });
        toast.success("Success! We will contact you soon.");
      }) // Log the response
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return formData.fullName && formData.email && formData.phoneNumber;
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
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
          onSubmit={handleSubmit}
          novalidate
        >
          <input
            type="text"
            placeholder="Full Name*"
            style={{ padding: "10px" }}
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email*"
            style={{ padding: "10px" }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            placeholder="Phone Number*"
            style={{ padding: "10px" }}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />

          <button
            style={{
              border: "none",
              backgroundColor: isFormValid() ? "#000" : "#ccc",
              color: "#fff",
              cursor: isFormValid() ? "pointer" : "not-allowed",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              height: "20px",
              boxSizing: "content-box",
              textAlign: "center",
            }}
            type="submit"
            disabled={!isFormValid()}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>Get Free Solar Design</span>
            )}
          </button>
        </form>

        <p style={{ fontSize: "0.8rem" }}>
          Your data is secure by our{" "}
          <a href="/privacy-policy">Privacy policies</a>
        </p>
      </div>
    </div>
  );
};
