import React, { useEffect, useState } from "react";

export const Step1 = ({
  handleUserAnswer,
  onInputChange,
  streetsData,
  setSelectedStreetId,
  selectedStreetId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e);
    setShowDropdown(true);
  };

  const handleSelectStreet = (street) => {
    setInputValue(street.description);
    setShowDropdown(false);
    setSelectedStreetId(street.place_id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        height: "77vh",
      }}
    >
      <h1>Let's check your roof's sun exposure </h1>

      <p>
        We'll use your location to provide you with tailored information about
        solar panels in your area. Your privacy is important to us, so we won't
        share your address!
      </p>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid #000",
          }}
        >
          <input
            placeholder="Search by address or ZIP code"
            style={{
              width: "100%",
              height: "20px",
              padding: "10px",
              border: "none",
              borderRadius: "none",
            }}
            value={inputValue}
            onChange={handleInputChange}
          />

          <button
            style={{
              border: "none",
              minWidth: "100px",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => handleUserAnswer({ street: selectedStreetId.slice(0, 10) })}
          >
            Check my roof
          </button>
        </div>

        {showDropdown && streetsData.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderTop: "none",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1,
            }}
          >
            {streetsData.map((street, index) => (
              <li
                key={index}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor:
                    street.place_id === selectedStreetId
                      ? "#e0e0e0"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e0e0e0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    street.place_id === selectedStreetId
                      ? "#e0e0e0"
                      : "transparent";
                }}
                onClick={() => handleSelectStreet(street)}
              >
                {street.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ width: "100%", height: "50vh" }}>
        <img
          src="https://placehold.co/600x400"
          alt="Solar Panels"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};
