import { Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function GoogleMap() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const position = { lat: latitude, lng: longitude };

  return (
    <Map
      center={position}
      zoom={15}
      defaultOptions={{ disableDefaultUI: false }}
    ></Map>
  );
}

export default GoogleMap;
