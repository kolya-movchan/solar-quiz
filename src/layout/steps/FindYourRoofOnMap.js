import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { debounce } from "../../hooks/useDebounce";
import { Container } from "../container";
import { SearchLocation } from "../../components/LocationSearch";
import { GoogleMapLayout } from "../../components/GoogleMapFrame";

// const center = { lat: 38.8292347, lng: -90.4875674 };
const center = {};

export const FindYourRoofOnMap = ({
  handleUserAnswer,
  setStateAbbreviation,
  quizData,
  setLocationCollection,
}) => {
  const [inputValue, setInputValue] = useState(
    quizData.location ? quizData.location : ""
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(quizData.location);
  const [mapCenter, setMapCenter] = useState(
    quizData.coordinates ? quizData.coordinates : center
  );

  const [streetsData, setStreetsData] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);
  const mapRef = useRef(null);

  const fetchAddressesData = debounce(async (value) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/autocomplete`,
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
        `${process.env.REACT_APP_BACKEND_HOST}/api/geocode`,
        {
          params: {
            place_id: placeId,
          },
        }
      );

      const location = response.data.data.results[0].geometry.location;
      const locationData = response.data.data.results[0].address_components;

      // Extract state abbreviation
      const stateComponent = locationData.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      const stateAbbreviation = stateComponent
        ? stateComponent.short_name
        : null;

      console.log("locationData", locationData);

      let locationCollection = {
        streetAddress: "",
        city: "",
        zipCode: "",
      };

      for (let i = 0; i < locationData.length; i++) {
        switch (locationData[i].types[0]) {
          case "street_number":
            locationCollection.streetAddress = locationData[i].long_name;
            break;

          case "route":
            locationCollection.streetAddress =
              `${locationCollection.streetAddress} ${locationData[i].long_name}`.trim();
            break;

          case "locality":
            locationCollection.city = locationData[i].long_name;
            break;

          case "administrative_area_level_1":
            locationCollection.state = locationData[i].long_name;
            break;

          case "postal_code":
            locationCollection.zipCode = locationData[i].long_name;
            break;

          default:
            break;
        }
      }

      setLocationCollection(locationCollection);

      console.log("location collection:", locationCollection);

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

    if (e.target.value === "") {
      setIsStreetSelected(false);
    }
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

  const getSuggestedAddress = async (coordinates, isManualLocation = false) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/reverse-geocode`,
      {
        params: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
      }
    );

    if (response.request.status === 200) {
      const firstResult = response.data.data;
      const placeId = firstResult.place_id;

      try {
        await getCoordinates(placeId, true);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }

      setInputValue(firstResult.formatted_address);
      setIsStreetSelected(true);

      console.log(
        "suggested full address:",
        firstResult.formatted_address.replace(/, USA$/, "")
      );

      handleUserAnswer({
        location: firstResult.formatted_address.replace(/, USA$/, ""),
        coordinates: { lat: coordinates.lat, lng: coordinates.lng },
        placeId: placeId,
        is_manual_location: isManualLocation,
      });
    } else {
      console.error("No results found or error:", response.data.status);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-with-map">
      <h1 style={{ margin: "0", maxWidth: "450px" }} className="title">
        Let's check your roof's sun exposure
      </h1>

      <p style={{ marginTop: "0", color: "#505050" }} className="map-paragraph">
        Using satellite technology, we'll check your roof's sun exposure to
        determine your home's solar potential — no site visit needed.
      </p>

      <SearchLocation
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        showDropdown={showDropdown}
        streetsData={streetsData}
        selectedStreet={selectedStreet}
        handleSelectStreet={handleSelectStreet}
        getSuggestedAddress={getSuggestedAddress}
        dropdownRef={dropdownRef}
        isStreetSelected={isStreetSelected}
        isLoading={isLoading}
        mapCenter={mapCenter}
      />

      <div className="google-map-container" style={{ marginTop: "-8px" }}>
        {isStreetSelected ? (
          <GoogleMapLayout
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            onDrag={getSuggestedAddress}
            mapRef={mapRef}
          />
        ) : (
          <img
            src="/icons/map-placeholder.png"
            alt="Map Placeholder"
            className="map-placeholder"
            style={{}}
          />
        )}
      </div>
    </Container>
  );
};
