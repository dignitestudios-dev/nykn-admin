import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

function GoogleMaps({ setLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_SECRET}`,
  });
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
    setLatitude(latitude ? latitude : 0);
    setLongitude(longitude ? longitude : 0);

    // Perform reverse geocoding
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          import.meta.env.VITE_GOOGLE_MAP_SECRET
        }`
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
        `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_SECRET
        }`
      )
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLatitude(lat ? lat : 0);
        setLongitude(lng ? lng : 0);
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
  const customIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10c-1.63 0-3-1.37-3-3s1.37-3 3-3 3 1.37 3 3-1.37 3-3 3z"/>
  </svg>
`;

  useEffect(() => {
    handleSetAddress();
  }, [userInput]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={(e) => handleMapClick(e)}
          // options={{
          //   styles: [
          //     {
          //       // featureType: "landscape",
          //       // elementType: "geometry",
          //       stylers: [{ hue: "#8cd790" }, { saturation: 50 }],
          //     },
          //   ],
          // }}
        >
          {/* Render a marker for the user */}
          <Marker
            position={{
              lat: latitude,
              lng: longitude,
            }}
          ></Marker>
        </GoogleMap>
      )}
    </>
  );
}

export default GoogleMaps;
