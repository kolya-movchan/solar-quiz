import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { debounce } from "../hooks/useDebounce";
import { Container } from "../components/container";
import { SearchLocation } from "../components/searchLocation";
import { GoogleMapLayout } from "../components/googleMap";

const center = {
  lat: 42.3601,
  lng: -71.0589,
};

export const FindYourRoofOnMap = ({
  handleUserAnswer,
  setStateAbbreviation,
  quizData,
}) => {
  const [inputValue, setInputValue] = useState(
    quizData.location ? quizData.location.description : ""
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [streetsData, setStreetsData] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);
  const mapRef = useRef(null);

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
        setMapCenter({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

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

  useEffect(() => {
    if (quizData.location) {
      handleSelectStreet(quizData.location);
    }
  }, [quizData.location]);

  return (
    <Container className="container-without-cards">
      <h1 style={{ margin: "0" }} className="title">
        Let's check your roof's sun exposure
      </h1>

      <p style={{ margin: "0" }} className="paragraph">
        We'll use your location to provide you with tailored information about
        solar panels in your area. Your privacy is important to us, so we won't
        share your address!
      </p>

      <SearchLocation
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        showDropdown={showDropdown}
        streetsData={streetsData}
        selectedStreet={selectedStreet}
        handleSelectStreet={handleSelectStreet}
        handleUserAnswer={handleUserAnswer}
        dropdownRef={dropdownRef}
        isStreetSelected={isStreetSelected}
        isLoading={isLoading}
      />

      <div className="google-map-container">
        <GoogleMapLayout
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          mapRef={mapRef}
        />
      </div>
    </Container>
  );
};
