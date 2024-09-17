import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 42.3601, // Default center (can be set dynamically)
  lng: -71.0589,
};

const libraries = ["places"];

export const Step1 = ({
  handleUserAnswer,
  onInputChange,
  streetsData,
  setSelectedStreet,
  selectedStreet,
  getCoordinates,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(false);
  const dropdownRef = useRef(null);

  const [solarMapData, setSolarMapData] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const getSolarMap = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH`,
        {
          params: { key: process.env.REACT_APP_SOLAR_API_KEY },
        }
      );

      console.log("Solar Building Insights Map:", response.data);
      setSolarMapData(response.data);

      // Update map center based on building location
      if (response.data.center) {
        setMapCenter({
          lat: response.data.center.latitude,
          lng: response.data.center.longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching solar map data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e);
    setShowDropdown(true);
    setIsStreetSelected(false);
  };

  const handleSelectStreet = (street) => {
    setInputValue(street.description);
    setShowDropdown(false);
    setSelectedStreet(street);
    setIsStreetSelected(true);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

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
            onClick={() => {
              handleUserAnswer({
                street: selectedStreet.place_id.slice(0, 10),
              });
              getCoordinates(selectedStreet.place_id);
            }}
          >
            Check my roof
          </button>
        </div>

        {inputValue.trim().length > 0 && !isStreetSelected && (
          <ul
            ref={dropdownRef}
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
            <li style={{ padding: "10px" }}>No results found</li>
          </ul>
        )}

        {showDropdown && streetsData.length > 0 && (
          <ul
            ref={dropdownRef}
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
                    street.place_id === selectedStreet.place_id
                      ? "#e0e0e0"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e0e0e0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    street.place_id === selectedStreet.place_id
                      ? "#e0e0e0"
                      : "transparent";
                }}
                onClick={() => {
                  console.log(street);
                  handleSelectStreet(street);
                }}
              >
                {street.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ width: "100%", height: "50vh" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={mapCenter}
        >
          {solarMapData && (
            <Marker
              position={{
                lat: solarMapData.center.latitude,
                lng: solarMapData.center.longitude,
              }}
            />
          )}
          {/* Add any custom overlays or data visualization here */}
        </GoogleMap>
        {/* <img
          src="https://placehold.co/600x400"
          alt="Solar Panels"
          style={{ width: "100%", height: "100%" }}
        /> */}
      </div>
    </div>
  );
};
