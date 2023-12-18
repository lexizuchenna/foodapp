import axios from "axios";

const calculateDistanceAndTime = async (
  startLat,
  startLng,
  destinationLat,
  destinationLng,
  mode = "walking"
) => {
  const apiKey = "AIzaSyBoWxGi97h1AM8SRHIPScR-LVkCNalZlc8"; // Replace with your API Key
  const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  const ratePerKm = 1;

  const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

  try {
    const { data } = await axios.get(
      requestUrl,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
      {}
    );

    // Ensure the request was successful and there are results
    if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;

      const distanceInKm = parseFloat(distance.replace(" km", ""));
      const price = distanceInKm * ratePerKm;
      const finalPrice = `$${price.toFixed(2)}`;

      return {
        distance,
        duration,
        finalPrice,
      };
    } else {
      console.error("Error calculating:", data);
      return null;
    }
  } catch (error) {
    console.error("Failed to calculate", error);
    return null;
  }
};

const extractNumbers = (inputStr) => {
  if (typeof inputStr !== "string") {
    return [];
  }
  const matched = inputStr.match(/\d+/g);
  return matched ? matched.map((num) => parseInt(num, 10)) : [];
};

export default {
  calculateDistanceAndTime,
  extractNumbers,
};
