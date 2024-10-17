import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 42.3601, // Default center (can be set dynamically)
  lng: -71.0589,
};

const libraries = ["places", "visualization"];

export const FindYourRoofOnMap = ({
  handleUserAnswer,
  setStateAbbreviation,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [streetsData, setStreetsData] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [solarData, setSolarData] = useState(null); // For storing solar coverage data

  const dropdownRef = useRef(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchAddressesData = debounce(async (value) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://${process.env.REACT_APP_BACKEND_HOST}/api/autocomplete`,
        {
          params: {
            input: value.target.value,
          },
        }
      );
      setStreetsData(response.data.data.predictions);
      setSelectedStreet(response.data.data.predictions[0]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const getCoordinates = async (placeId) => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_BACKEND_HOST}/api/geocode`,
        {
          params: {
            place_id: placeId,
          },
        }
      );

      const location = response.data.data.results[0].geometry.location;

      // Extract state abbreviation
      const stateComponent =
        response.data.data.results[0].address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        );

      const stateAbbreviation = stateComponent
        ? stateComponent.short_name
        : null;

      setStateAbbreviation(stateAbbreviation);

      if (location) {
        // Fetch solar data for the new location
        // fetchSolarData(location.lat, location.lng);
        setMapCenter({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  // LOGIC OF GETTING THE COVERAGE AREA FOR THE SOLAR PANELS

  // const fetchSolarData = async (latitude, longitude) => {
  //   try {
  //     const apiKey = process.env.REACT_APP_SOLAR_API_KEY; // Use your Solar API key here
  //     const params = {
  //       "location.latitude": latitude.toFixed(5),
  //       "location.longitude": longitude.toFixed(5),
  //       key: apiKey,
  //     };

  //     const response = await axios.get(
  //       `https://solar.googleapis.com/v1/buildingInsights:findClosest`,
  //       { params }
  //     );

  //     if (response.status === 200) {
  //       setSolarData(response.data); // Save solar data for rendering
  //     } else {
  //       console.error("Error fetching solar data:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching solar data:", error);
  //   }
  // };

  // END OF LOGIC OF GETTING THE COVERAGE AREA FOR THE SOLAR PANELS

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
    fetchAddressesData(e);
    setShowDropdown(true);
    setIsStreetSelected(false);
  };

  const handleSelectStreet = (street) => {
    setInputValue(street.description);
    setShowDropdown(false);
    setSelectedStreet(street);
    setIsStreetSelected(true);

    getCoordinates(street.place_id);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "";

  return (
    <div
      className="container container-without-cards"
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        gap: "24px",
        paddingTop: "30px",
      }}
    >
      <h1 style={{ margin: "0" }} className="title">
        Let's check your roof's sun exposure{" "}
      </h1>

      <p style={{ margin: "0" }} className="paragraph">
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
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            placeholder="Search your address to check your roof"
            style={{
              width: "100%",
              height: "20px",
              border: "1px solid #D0D5DD",
              outline: "none",
              color: "#475467",
              fontSize: "16px",
              backgroundImage: "url(./icons/map-pin.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundPositionX: "15px",
              backgroundSize: "24px",
              "::placeholder": {
                color: "#475467",
              },
            }}
            className="input-search-map"
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* 
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
              setInputValue(selectedStreet.description);
              getCoordinates(selectedStreet.place_id);
            }}
          >
            Check my roof
          </button> */}
        </div>

        {showDropdown && streetsData.length > 0 ? (
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
              // border: "1px solid #ccc",
              borderTop: "none",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 2,
            }}
          >
            {streetsData.map((street, index) => (
              <li
                key={index}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  cursor: "pointer",
                  // borderBottom: "1px solid #eee",
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
                  handleUserAnswer({ location: street });
                  handleSelectStreet(street);
                }}
              >
                {street.description}
              </li>
            ))}
          </ul>
        ) : (
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
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1,
            }}
          >
            {inputValue.trim().length > 0 && !isStreetSelected && (
              <li style={{ padding: "10px" }}>
                {isLoading ? "Loading..." : "No results found"}
              </li>
            )}
          </ul>
        )}
      </div>

      <div style={{ width: "100%", position: "relative" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={17}
          center={mapCenter}
          mapTypeId="satellite"
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onDragEnd={() => {
            const center = mapRef.current.getCenter();
            const newCenter = { lat: center.lat(), lng: center.lng() };
            setMapCenter(newCenter);
          }}
        ></GoogleMap>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            zIndex: 1,
          }}
        >
          <img
            src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
            alt="marker"
          />
        </div>
      </div>
    </div>
  );
};
