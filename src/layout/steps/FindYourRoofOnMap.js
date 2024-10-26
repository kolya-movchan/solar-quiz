import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { debounce } from "../../hooks/useDebounce";
import { Container } from "../container";
import { SearchLocation } from "../../components/LocationSearch";
import { GoogleMapLayout } from "../../components/GoogleMapFrame";

const center = { lat: 38.8292347, lng: -90.4875674 };

export const FindYourRoofOnMap = ({
  handleUserAnswer,
  setStateAbbreviation,
  quizData,
}) => {
  const [inputValue, setInputValue] = useState(
    quizData.location ? quizData.location : ""
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(quizData.location);
  const [mapCenter, setMapCenter] = useState(
    quizData.coordinates ? quizData.coordinates : center
  );

  console.log("quiz coords", quizData.coordinates);
  console.log("mapCenter", mapCenter);

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

  const getCoordinates = async (placeId, skipUpdateMap = false) => {
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

      if (location && !skipUpdateMap) {
        setMapCenter({ lat: location.lat, lng: location.lng });
      }

      return { lat: location.lat, lng: location.lng };
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

  const handleSelectStreet = async (street) => {
    setInputValue(street.description);
    setShowDropdown(false);
    setSelectedStreet(street);
    setIsStreetSelected(true);

    return await getCoordinates(street.place_id).then((coordinates) => {
      return coordinates;
    });
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
    window.scrollTo(0, 0);
  }, []);

  const getSuggestedAddress = async (coordinates) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en`
    );

    if (response.data.status === "OK") {
      const firstResult = response.data.results[0];
      const placeId = firstResult.place_id;

      try {
        await getCoordinates(placeId, true);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }

      setInputValue(firstResult.formatted_address);
      setIsStreetSelected(true);
      handleUserAnswer({
        location: firstResult.formatted_address,
        coordinates: { lat: coordinates.lat, lng: coordinates.lng },
        placeId: placeId,
        is_manual_location: true,
      });
    } else {
      console.error("No results found or error:", response.data.status);
    }
  };

  return (
    <Container className="container-with-map">
      <h1 style={{ margin: "0", maxWidth: "450px" }} className="title">
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
        mapCenter={mapCenter}
      />

      <div className="google-map-container">
        <GoogleMapLayout
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          onDrag={getSuggestedAddress}
          mapRef={mapRef}
        />
      </div>
    </Container>
  );
};
