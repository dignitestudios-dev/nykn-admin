import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

function GoogleMaps({ setLocation }) {
  const {
    setLatitude,
    setLongitude,
    userInput,
    setUserInput,
    latitude,
    longitude,
  } = useContext(GlobalContext);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  };

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: null,
  });

  const user = {
    id: "user",
    lat: selectedLocation.latitude || latitude,
    lng: selectedLocation.longitude || longitude,
  };

  const center = {
    lat: user.lat,
    lng: user.lng,
  };

  const handleMapClick = (e) => {
    const { latLng } = e;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setLatitude(latitude);
    setLongitude(longitude);

    // Perform reverse geocoding
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_SECRET}`
      )
      .then((response) => {
        const address = response.data.results[1].formatted_address;
        setUserInput(address);
        setSelectedLocation({ latitude, longitude, address });
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        setLocation("Address not available");
        setSelectedLocation({
          latitude,
          longitude,
          address: "Address not available",
        });
      });
  };

  const handleSetAddress = () => {
    // Perform geocoding for the entered address
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${process.env.REACT_APP_GOOGLE_MAP_SECRET}`
      )
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setSelectedLocation({
          latitude: lat,
          longitude: lng,
          address: userInput,
        });
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  };

  useEffect(() => {
    handleSetAddress();
  }, [userInput]);

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_SECRET}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={(e) => handleMapClick(e)}
          options={{
            styles: [
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ hue: "#8cd790" }, { saturation: 50 }],
              },
            ],
          }}
        >
          {/* Render a marker for the user */}
          <Marker
            position={{
              lat: 0,
              lng: 0,
            }}
          ></Marker>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default GoogleMaps;
