import React from "react";

export const SearchLocation = ({
  inputValue,
  handleInputChange,
  showDropdown,
  streetsData,
  selectedStreet,
  handleSelectStreet,
  handleUserAnswer,
  dropdownRef,
  isStreetSelected,
  isLoading,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
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
            color: "#000",
            fontSize: "16px",
            backgroundImage: isStreetSelected
              ? "url(./icons/map-pin-selected.png)"
              : "url(./icons/map-pin.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            backgroundPositionX: "15px",
            backgroundSize: "24px",
            "::placeholder": {
              color: "#475467",
            },
            borderRadius: "4px",
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
            borderRadius: "4px",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 2,
            marginTop: "10px",
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
                setTimeout(() => {
                  handleUserAnswer({
                    location: street.description,
                    place_id: street.place_id,
                  });
                }, 1000);
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
            marginTop: "10px",
            borderRadius: "4px",
          }}
        >
          {inputValue.trim().length > 0 && !isStreetSelected && (
            <li style={{ padding: "20px" }}>
              {isLoading ? "Loading..." : "No results found"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
