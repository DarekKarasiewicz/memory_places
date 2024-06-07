import {
  Map,
  useApiIsLoaded,
  useAdvancedMarkerRef,
  InfoWindow,
  AdvancedMarker,
  MapControl,
  ControlPosition,
} from '@vis.gl/react-google-maps';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { selectLocation } from 'Redux/locationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { addPlacelocationActions, selectAddPlaceLocation } from 'Redux/addPlaceLocationSlice';
import { modalsActions, selectModals } from 'Redux/modalsSlice';
import { selectUserPlaces } from 'Redux/userPlacesSlice';
import { filterPlaces, fetchMapPlaces } from 'Redux/allMapPlacesSlice';
import { filterTrails, fetchMapTrails } from 'Redux/allMapTrailsSlice';
import { selectUpdatePlace } from 'Redux/updatePlaceSlice';
import { addPlaceActions } from 'Redux/addPlaceSlice';
import { selectAddTrail } from 'Redux/addTrailSlice.jsx';
import { selectUpdateTrail } from 'Redux/updateTrailSlice.jsx';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { advancedObjectActions } from 'Redux/advancedObjectSlice';

import AddPlaceButton from 'Pages/MemoryPlaces/AddPlace/AddPlaceButton.jsx';
import Loader from 'Components/Loader/Loader.js';
import BaseButton from 'Components/Base/BaseButton.js';
import GoogleMapPin from './GoogleMapPin.jsx';
import DrawingControl from './TrailDrawing/DrawingControl.jsx';
import { useDrawingManager } from './TrailDrawing/useDrawingManager.jsx';
import { Polyline } from './MapOverlay/Polyline.jsx';
import AlertIcon from 'icons/AlertIcon.jsx';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const GoogleMap = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);
  const updatePlaceData = useSelector(selectUpdatePlace);
  const addTrailData = useSelector(selectAddTrail);
  const updateTrailData = useSelector(selectUpdateTrail);
  const modalsData = useSelector(selectModals);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoaded = useApiIsLoaded();
  const [isPositionLoaded, setIsPositionLoaded] = useState(false);
  const position = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);
  const [placeInfoBoxVisibility, setPlaceInfoBoxVisibility] = useState(false);
  const [trailInfoBoxVisibility, setTrailInfoBoxVisibility] = useState(false);
  const [currentPlace, setCurrentPlace] = useState([]);
  const [currentTrail, setCurrentTrail] = useState([]);
  const filterItems = useSelector((state) => state.allMapPlaces.filterItems);
  const filteredTrails = useSelector((state) => state.allMapTrails.filterItems);
  const { t } = useTranslation();
  const mapId = process.env.REACT_APP_MAP_ID;
  const drawingManager = useDrawingManager();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { fontSize } = useFontSize();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  }, [location]);

  useEffect(() => {
    const fetchPlacesAndFilter = () => {
      if (user && user.user_id) {
        dispatch(fetchMapPlaces(user.user_id));
      } else {
        dispatch(fetchMapPlaces());
      }
      dispatch(filterPlaces({ sortof: 0, type: 0, period: 0 }));
    };

    const fetchTrailsAndFilter = () => {
      if (user && user.user_id) {
        dispatch(fetchMapTrails(user.user_id));
      } else {
        dispatch(fetchMapTrails());
      }
      dispatch(filterTrails({ type: 0, period: 0 }));
    };

    fetchPlacesAndFilter();
    fetchTrailsAndFilter();
  }, [dispatch]);

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

  const togglePlaceInfoBox = (place) => {
    setCurrentPlace(place);
    setPlaceInfoBoxVisibility((previousState) => !previousState);
  };

  const toggleTrailInfoBox = (trail) => {
    setCurrentTrail(trail);
    setTrailInfoBoxVisibility((previousState) => !previousState);
  };

  const closePlaceInfoBox = () => setPlaceInfoBoxVisibility(false);

  const closeTrailInfoBox = () => setTrailInfoBoxVisibility(false);

  const handleConfirm = () => {
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: false }));
    if (updatePlaceData.isDataLoaded === true) {
      dispatch(modalsActions.changeIsUpdateModalOpen());
    } else {
      dispatch(modalsActions.changeIsFormModalOpen());
    }
  };

  useEffect(() => {
    if (position.lat !== null && position.lng !== null) {
      setIsPositionLoaded(true);
    }
  }, [position]);

  const handleFormModalVisability = () => {
    if (modalsData.isFormModalOpen === true) {
      dispatch(addPlaceActions.reset());
    }
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const fetchSelectedPlaceInfo = async (id) => {
    if (!currentPlace) return;

    try {
      const response = await axios.get(`http://localhost:8000/memo_places/places/pk=${id}`);
      return response.data;
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchSelectedTrailInfo = async () => {
    if (!currentTrail) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/memo_places/path/pk=${currentTrail.id}`,
      );
      return response.data;
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  return isLoaded && isPositionLoaded ? (
    <div
      className={`absolute bottom-0 h-screen transition-transform delay-150 ${
        userPlacesData.isOpen ? 'right-0 w-2/3 xl:w-3/5 lg:w-3/5 md:w-3/5' : 'left-0 w-screen'
      }`}
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
        {!addPlaceLocation.isSelecting && !addTrailData.isSelecting ? (
          <AddPlaceButton openModal={handleFormModalVisability} />
        ) : null}
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
                <div className='w-36 h-12 flex justify-center items-center overflow-hidden'>
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

        {filterItems && filterItems.length > 0 ? (
          filterItems.map((place) => (
            <AdvancedMarker
              key={place.id}
              onClick={() => addPlaceLocation.isSelecting === false && togglePlaceInfoBox(place)}
              position={{ lat: place.lat, lng: place.lng }}
            >
              <GoogleMapPin iconPath={place.type} isVerified={place.verified === true} />
            </AdvancedMarker>
          ))
        ) : (
          <p className={`text-${fontSize}-base`}>{t('google_maps.no_items')}</p>
        )}
        {filteredTrails && filteredTrails.length > 0 ? (
          filteredTrails.map((trail) => (
            <Polyline
              key={trail.id}
              strokeColor={'#00FF00'}
              strokeOpacity={0.3}
              strokeWeight={10}
              path={JSON.parse(trail.coordinates)}
              onClick={() => toggleTrailInfoBox(trail)}
            />
          ))
        ) : (
          <p className={`text-${fontSize}-base`}>{t('google_maps.no_items')}</p>
        )}

        {placeInfoBoxVisibility && (
          <InfoWindow
            position={{ lat: currentPlace.lat, lng: currentPlace.lng }}
            onCloseClick={closePlaceInfoBox}
            options={{ pixelOffset: { width: 0, height: -30 } }}
          >
            <div className='flex flex-col items-center gap-2'>
              {currentPlace.verified !== true && (
                <div className='flex justify-center items-center gap-2 bg-yellow-500 rounded-lg p-2 w-full'>
                  <AlertIcon color='#000' />
                  <span className={`text-${fontSize}-base font-semibold`}>
                    {t('common.not_verified_place')}
                  </span>
                </div>
              )}
              {/* TODO when from backend will be array of images get first one and put it here */}
              {/* <section className='w-72 h-52 overflow-hidden'>
                <img
                  src='https://placehold.co/300x300'
                  alt='placeholder-image'
                  className='w-full h-full object-cover'
                ></img>
              </section> */}
              <section
                className={`flex flex-col gap-1 justify-center items-center text-${fontSize}-sm`}
              >
                <span className='text-center font-bold'>{currentPlace.place_name}</span>
                <span>
                  <span className='italic font-medium'>{t('common.created')}</span>{' '}
                  {currentPlace.creation_date}
                </span>
                <span>
                  <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                  {currentPlace.username}
                </span>
              </section>
              <BaseButton
                className='text-sm my-1'
                btnBg='blue'
                name={t('common.more_info')}
                onClick={async () => {
                  closePlaceInfoBox();
                  try {
                    const placeData = await fetchSelectedPlaceInfo(currentPlace.id);

                    dispatch(advancedObjectActions.changePlace(placeData));
                    dispatch(advancedObjectActions.changeKind('place'));
                    dispatch(advancedObjectActions.changeIsAdvancedObjectOpen());
                  } catch (error) {
                    console.error('Failed to fetch place data');
                  }
                }}
              />
            </div>
          </InfoWindow>
        )}

        {trailInfoBoxVisibility && (
          <InfoWindow
            position={{
              lat: JSON.parse(currentTrail.coordinates)[0].lat,
              lng: JSON.parse(currentTrail.coordinates)[0].lng,
            }}
            onCloseClick={closeTrailInfoBox}
            options={{ pixelOffset: { width: 0, height: -30 } }}
          >
            <div className='flex flex-col items-center gap-2'>
              {currentTrail.verified !== true && (
                <div className='flex justify-center items-center gap-2 bg-yellow-500 rounded-lg p-2 w-full'>
                  <AlertIcon color='#000' />
                  <span className={`text-${fontSize}-base font-semibold`}>
                    {t('common.not_verified_trail')}
                  </span>
                </div>
              )}
              {/* TODO when from backend will be array of images get first one and put it here */}
              {/* <section className='w-72 h-52 overflow-hidden'>
                <img
                  src='https://placehold.co/300x300'
                  alt='placeholder-image'
                  className='w-full h-full object-cover'
                ></img>
              </section> */}
              <section
                className={`flex flex-col gap-1 justify-center items-center text-${fontSize}-sm`}
              >
                <span className='text-center font-bold'>{currentTrail.path_name}</span>
                <span>
                  <span className='italic font-medium'>{t('common.created')}</span>{' '}
                  {currentTrail.creation_date}
                </span>
                <span>
                  <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                  {currentTrail.username}
                </span>
              </section>
              <BaseButton
                className='text-sm my-1'
                btnBg='blue'
                name={t('common.more_info')}
                onClick={async () => {
                  closeTrailInfoBox();
                  try {
                    const trailData = await fetchSelectedTrailInfo(currentTrail.id);

                    dispatch(advancedObjectActions.changePlace(trailData));
                    dispatch(advancedObjectActions.changeKind('trail'));
                    dispatch(advancedObjectActions.changeIsAdvancedObjectOpen());
                  } catch (error) {
                    console.log('Failed to fetch trail data');
                  }
                }}
              />
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  ) : (
    <Loader />
  );
};

export default GoogleMap;
