const axios = require("axios");

exports.autocomplete = async (req, res) => {
  const { input } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input,
          key: process.env.GOOGLE_MAPS_API_KEY,
          components: "country:us",
          types: "address",
        },
      }
    );

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.geocode = async (req, res) => {
  const { place_id } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          place_id,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.reverseGeocode = async (req, res) => {
  const { lat, lng } = req.query;
  const coordinates = { lat, lng };

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
    );

    if (response.data.status === "OK") {
      const firstResult = response.data.results[0];
      res.status(200).json({ data: firstResult });
    } else {
      res.status(400).json({ error: "No results found" });
    }
  } catch (error) {
    console.error("Error fetching Google API data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
