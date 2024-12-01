import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh", // Ensure the map takes up full height
};

const LiveLocationWithDirection = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);
  const rotationRef = useRef(0); // Store the rotation in a ref to avoid re-renders
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBaFiX_Jl8BSY9fE6WMNPK6tnD8giS-coA", // Replace with your Google Maps API key
  });

  const lastUpdateTime = useRef(Date.now()); // Store last update time for throttling

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Watch the user's location continuously
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Throttle updates to reduce glitches
        const now = Date.now();
        if (now - lastUpdateTime.current < 200) return; // Only update every 200ms
        lastUpdateTime.current = now;

        setPreviousLocation(currentLocation); // Save the previous location
        setCurrentLocation(newLocation); // Update the current location
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to fetch your location. Please enable location services.");
      },
      {
        enableHighAccuracy: true, // High accuracy mode
        maximumAge: 0,
        timeout: 10000,
      }
    );

    // Cleanup watcher when component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentLocation]);

  // Calculate the rotation angle based on movement direction
  const calculateRotation = () => {
    if (previousLocation && currentLocation) {
      const dx = currentLocation.lng - previousLocation.lng;
      const dy = currentLocation.lat - previousLocation.lat;

      // Calculate the angle in radians
      const angleInRadians = Math.atan2(dy, dx);
      // Convert radians to degrees
      const angleInDegrees = (angleInRadians * 180) / Math.PI;

      // Normalize the angle to be between 0° and 360°
      let correctedAngle = angleInDegrees < 0 ? 360 + angleInDegrees : angleInDegrees;

      // Smooth transition of rotation (only update if angle has changed significantly)
      if (Math.abs(rotationRef.current - correctedAngle) > 1) {
        rotationRef.current = correctedAngle; // Update rotation in ref
      }

      return rotationRef.current;
    }
    return rotationRef.current;
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      {currentLocation ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation} // Center the map on the current location
          zoom={16} // Set zoom level
        >
          {/* Marker with local SVG icon */}
          <Marker
            position={currentLocation}
            icon={{
              url: "/icons/arrow.svg", // Path to your local SVG file
              rotation: calculateRotation(), // Apply smooth rotation
              scaledSize: new window.google.maps.Size(50, 50), // Set the size of the arrow icon (50px by 50px)
            }}
          />
        </GoogleMap>
      ) : (
        <h2>Fetching your live location...</h2>
      )}
    </div>
  );
};

export default LiveLocationWithDirection;
