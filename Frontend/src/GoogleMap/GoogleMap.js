import {
  Pin,
  Map,
  useApiIsLoaded,
  useAdvancedMarkerRef,
  InfoWindow,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';
import { selectLocation } from '../Redux/locationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from '../Redux/addPlaceLocationSlice';
import { formModalActions } from '../Redux/formModalSlice';

const GoogleMap = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoaded = useApiIsLoaded();
  const [isPositionLoaded, setIsPositionLoaded] = useState(false);
  const position = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        dispatch(
          addPlacelocationActions.changeLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
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

  const handleLocationMarker = (event) => {
    dispatch(
      addPlacelocationActions.changeLocation({
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      }),
    );
  };

  const toggleInfoWindow = () => {
    setInfowindowShown((previousState) => !previousState);
  };

  const closeInfoWindow = () => setInfowindowShown(false);

  const handleConfirm = () => {
    dispatch(formModalActions.changeIsModalOpen());
    dispatch(addPlacelocationActions.changeIsSelecting(false));
  };

  useEffect(() => {
    if (position.lat !== null && position.lng !== null) {
      setIsPositionLoaded(true);
    }
  }, [position]);

  return isLoaded && isPositionLoaded ? (
    <div className='absolute bottom-0 left-0 w-screen h-screen'>
      <Map
        center={position}
        zoom={15}
        disableDefaultUI={true}
        clickableIcons={false}
        onClick={handleLocationMarker}
        mapId='1'
      >
        {addPlaceLocation.isSelecting && (
          <AdvancedMarker
            onClick={toggleInfoWindow}
            ref={markerRef}
            position={{ lat: addPlaceLocation.lat, lng: addPlaceLocation.lng }}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            {infowindowShown && (
              <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                <button onClick={handleConfirm}>Confirm</button>
              </InfoWindow>
            )}
          </AdvancedMarker>
        )}
      </Map>
    </div>
  ) : (
    <div className='absolute bottom-0 left-0 w-screen h-screen'>
      <div>Loading...</div>
    </div>
  );
};

export default GoogleMap;
