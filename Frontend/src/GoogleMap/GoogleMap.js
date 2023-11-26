import { Map, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useEffect, useState, useMemo } from 'react';
import { selectLocation } from '../Redux/locationSlice';
import { useSelector } from 'react-redux';

const GoogleMap = () => {
  const location = useSelector(selectLocation);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoaded = useApiIsLoaded();
  const position = { lat: latitude, lng: longitude };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        if (error.code === 1) {
          alert('Premission Denied');
        } else if (error.code === 2) {
          alert('Position Unavilable');
        } else {
          alert('Timeout');
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  }, [location]);

  return isLoaded ? (
    <div className='absolute bottom-0 left-0 w-screen h-screen'>
      <Map center={position} zoom={15} disableDefaultUI={true} clickableIcons={false}></Map>
    </div>
  ) : (
    <div className='absolute bottom-0 left-0 w-screen h-screen'>
      <div>Loading...</div>
    </div>
  );
};

export default GoogleMap;
