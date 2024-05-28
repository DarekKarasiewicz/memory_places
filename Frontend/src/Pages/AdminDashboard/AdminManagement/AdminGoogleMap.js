import {
  Map,
  useApiIsLoaded,
  useAdvancedMarkerRef,
  InfoWindow,
  AdvancedMarker,
  MapControl,
  ControlPosition,
} from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addPlacelocationActions, selectAddPlaceLocation } from 'Redux/addPlaceLocationSlice';
import { modalsActions } from 'Redux/modalsSlice';
import { selectAdminAction, adminActions } from 'Redux/adminActionSlice';
import { selectUpdatePlace } from 'Redux/updatePlaceSlice';
import { selectAddTrail } from 'Redux/addTrailSlice.jsx';
import { selectUpdateTrail } from 'Redux/updateTrailSlice.jsx';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import Loader from 'Components/Loader/Loader';
import GoogleMapPin from 'Pages/MemoryPlaces/GoogleMap/GoogleMapPin.jsx';
import DrawingControl from 'Pages/MemoryPlaces/GoogleMap/TrailDrawing/DrawingControl.jsx';
import Infobar from 'Components/Navbar/Infobar';
import { useDrawingManager } from 'Pages/MemoryPlaces/GoogleMap/TrailDrawing/useDrawingManager.jsx';
import { Polyline } from 'Pages/MemoryPlaces/GoogleMap/MapOverlay/Polyline.jsx';

const AdminGoogleMap = ({ action, kind, placePosition, cordsPosition }) => {
  const dispatch = useDispatch();
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const updatePlaceData = useSelector(selectUpdatePlace);
  const addTrailData = useSelector(selectAddTrail);
  const updateTrailData = useSelector(selectUpdateTrail);
  const adminActionData = useSelector(selectAdminAction);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cords, setCords] = useState(null);
  const isLoaded = useApiIsLoaded();
  const [isPositionLoaded, setIsPositionLoaded] = useState(false);
  const position = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);
  const { t } = useTranslation();
  const mapId = process.env.REACT_APP_MAP_ID;
  const drawingManager = useDrawingManager();

  useEffect(() => {
    if (action !== 'edit' && action !== 'view') {
      if (addPlaceLocation.lat && addPlaceLocation.lng) {
        position.lat = addPlaceLocation.lat;
        position.lng = addPlaceLocation.lng;
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            if (error.code === 1) {
              dispatch(notificationModalActions.changeType('alert'));
              dispatch(notificationModalActions.changeTitle(t('google_maps.error1_info')));
            } else if (error.code === 2) {
              dispatch(notificationModalActions.changeType('alert'));
              dispatch(notificationModalActions.changeTitle(t('google_maps.error2_info')));
            } else {
              dispatch(notificationModalActions.changeType('alert'));
              dispatch(notificationModalActions.changeTitle(t('google_maps.error3_info')));
            }
            dispatch(notificationModalActions.changeIsNotificationModalOpen());
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
    } else {
      if (placePosition) {
        setLatitude(placePosition.lat);
        setLongitude(placePosition.lng);
      }

      if (cordsPosition) {
        const positions = JSON.parse(cordsPosition);
        setCords(positions);
        setLatitude(positions[0].lat);
        setLongitude(positions[0].lng);
      }
    }
  }, [action, placePosition, position, cordsPosition]);

  useEffect(() => {
    if (addTrailData && addTrailData.coordinates && kind === 'trail') {
      setCords(addTrailData.coordinates);
    }
  }, [addTrailData]);

  useEffect(() => {
    if (position.lat !== null && position.lng !== null) {
      setIsPositionLoaded(true);
    }
  }, [position]);

  const handleLocationMarker = (event) => {
    if (addPlaceLocation.isSelecting) {
      dispatch(
        addPlacelocationActions.changeLocation({
          lat: event.detail.latLng.lat,
          lng: event.detail.latLng.lng,
        }),
      );
    }
  };

  const toggleInfoWindow = () => {
    setInfowindowShown((previousState) => !previousState);
  };

  const closeInfoWindow = () => setInfowindowShown(false);

  const handleConfirm = () => {
    position.lat = addPlaceLocation.lat;
    position.lng = addPlaceLocation.lng;

    dispatch(adminActions.changeAdminGoogleMapExtension(false));
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: false }));
    document.body.style.overflow = 'auto';

    if (updatePlaceData.isDataLoaded === true) {
      dispatch(modalsActions.changeIsUpdateModalOpen());
    } else {
      dispatch(modalsActions.changeIsFormModalOpen());
    }
  };

  return isLoaded && isPositionLoaded ? (
    <div
      className={` ${
        adminActionData.adminMapExtended
          ? 'absolute top-0 left-0 right-0 mx-auto mt-8 transform h-[85vh] w-[96vw] z-50 bg-black'
          : 'relative w-full h-1/2'
      } transition-transform delay-150`}
    >
      <Map
        center={position}
        zoom={15}
        minZoom={5}
        disableDefaultUI={true}
        clickableIcons={false}
        onClick={handleLocationMarker}
        mapId={mapId}
      >
        {addPlaceLocation.isSelecting && <Infobar />}

        {addTrailData.isSelecting && (
          <>
            <MapControl position={ControlPosition.TOP_CENTER}>
              <DrawingControl drawingManager={drawingManager} />
            </MapControl>
            {updateTrailData.isDataLoaded === true && (
              <Polyline
                strokeColor={'#000000'}
                strokeOpacity={0.3}
                strokeWeight={10}
                path={JSON.parse(updateTrailData.trail.coordinates)}
              />
            )}
          </>
        )}
        {addPlaceLocation.isSelecting && addPlaceLocation.lat && (
          <AdvancedMarker
            onClick={toggleInfoWindow}
            ref={markerRef}
            position={{ lat: addPlaceLocation.lat, lng: addPlaceLocation.lng }}
          >
            <GoogleMapPin />
            {infowindowShown && (
              <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                <div className='w-36 h-12 flex justify-center items-center'>
                  <BaseButton
                    onClick={handleConfirm}
                    type='submit'
                    name={t('common.confirm')}
                    btnBg='blue'
                  />
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        )}

        {addPlaceLocation.lat && addPlaceLocation.lng && !addPlaceLocation.isSelecting && (
          <AdvancedMarker
            key={1}
            position={{ lat: addPlaceLocation.lat, lng: addPlaceLocation.lng }}
          >
            <GoogleMapPin iconPath={`../../assets/places_icons/test_icon.svg`} />
          </AdvancedMarker>
        )}

        {placePosition && !addPlaceLocation.isSelecting && (
          <AdvancedMarker key={2} position={{ lat: latitude, lng: longitude }}>
            <GoogleMapPin iconPath={`../../assets/places_icons/test_icon.svg`} />
          </AdvancedMarker>
        )}

        {kind === 'trail' && addTrailData.coordinates && !addPlaceLocation.isSelecting && (
          <Polyline
            key={3}
            strokeColor={'#00FF00'}
            strokeOpacity={0.3}
            strokeWeight={10}
            path={cords}
          />
        )}

        {kind === 'trail' && cordsPosition && !addPlaceLocation.isSelecting && (
          <Polyline
            key={4}
            strokeColor={'#00FF00'}
            strokeOpacity={0.3}
            strokeWeight={10}
            path={cords}
          />
        )}
      </Map>
    </div>
  ) : (
    <Loader />
  );
};

export default AdminGoogleMap;
