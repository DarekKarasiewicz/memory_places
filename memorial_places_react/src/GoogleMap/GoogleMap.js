import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function GoogleMap() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        if (error.code === 1) {
          alert("Premission Denied");
        } else if (error.code === 2) {
          alert("Position Unavilable");
        } else {
          alert("Timeout");
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const position = { lat: latitude, lng: longitude };

  return isLoaded ? (
    <Map center={position} zoom={15}></Map>
  ) : (
    <div>Loading...</div>
  );
}

export default GoogleMap;
