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
import { modalsActions, selectModals } from '../Redux/modalsSlice';
import { selectUserPlaces, userPlacesActions } from '../Redux/userPlacesSlice';
import { filterPlaces, fetchMapPlaces } from '../Redux/allMapPlacesSlice';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';
import { selectAddPlace, addPlaceActions } from '../Redux/addPlaceSlice';
import AddPlaceButton from '../AddPlace/AddPlaceButton';
import Loader from '../Loader/Loader';
import { useTranslation } from 'react-i18next';

const GoogleMap = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);
  const updatePlaceData = useSelector(selectUpdatePlace);
  const modalsData = useSelector(selectModals);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoaded = useApiIsLoaded();
  const [isPositionLoaded, setIsPositionLoaded] = useState(false);
  const position = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);
  const [placeInfoBoxVisibility, setPlaceInfoBoxVisibility] = useState(false);
  const [currentPlace, setCurrentPlace] = useState([]);
  const filterItems = useSelector((state) => state.allMapPlaces.filterItems);
  const addPlaceData = useSelector(selectAddPlace);
  const { t } = useTranslation();

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
          alert(t('google_maps.error1_info'));
        } else if (error.code === 2) {
          alert(t('google_maps.error2_info'));
        } else {
          alert(t('google_maps.error3_info'));
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  }, [location]);

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      await dispatch(fetchMapPlaces());
      dispatch(filterPlaces({ sortof: 'all', type: 'all', period: 'all' }));
    };

    fetchDataAndFilter();
  }, [dispatch]);

  const handleLocationMarker = (event) => {
    if (userPlacesData.isOpen && !addPlaceLocation.isSelecting) {
      dispatch(userPlacesActions.changeIsOpen());
    } else if (addPlaceLocation.isSelecting) {
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

  const closePlaceInfoBox = () => setPlaceInfoBoxVisibility(false);

  const handleConfirm = () => {
    dispatch(addPlacelocationActions.changeIsSelecting(false));
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

  return isLoaded && isPositionLoaded ? (
    <div
      className={`absolute bottom-0 h-screen transition-transform delay-150 ${
        userPlacesData.isOpen ? 'right-0 w-2/3' : 'left-0 w-screen'
      }`}
    >
      <Map
        center={position}
        zoom={15}
        minZoom={5}
        disableDefaultUI={true}
        clickableIcons={false}
        onClick={handleLocationMarker}
        mapId='1'
      >
        {!addPlaceData.isSelecting && <AddPlaceButton openModal={handleFormModalVisability} />}
        {addPlaceLocation.isSelecting && (
          <AdvancedMarker
            onClick={toggleInfoWindow}
            ref={markerRef}
            position={{ lat: addPlaceLocation.lat, lng: addPlaceLocation.lng }}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            {infowindowShown && (
              <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                <button onClick={handleConfirm}>{t('common.confirm')}</button>
              </InfoWindow>
            )}
          </AdvancedMarker>
        )}

        {filterItems && filterItems.length > 0 ? (
          filterItems.map((place) => (
            <AdvancedMarker
              key={place.id}
              onClick={() => togglePlaceInfoBox(place)}
              position={{ lat: place.lat, lng: place.lng }}
            >
              <Pin background={'#FF0000'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
          ))
        ) : (
          <p>{t('google_maps.no_items')}</p>
        )}

        {placeInfoBoxVisibility && (
          <InfoWindow
            position={{ lat: currentPlace.lat, lng: currentPlace.lng }}
            onCloseClick={closePlaceInfoBox}
            options={{ pixelOffset: { width: 0, height: -30 } }}
          >
            <div className='flex flex-col'>
              <span className='text-center font-bold'>{currentPlace.place_name}</span>
              <span>
                <span className='italic font-medium'>{t('commmon.description')}</span>{' '}
                {currentPlace.description}
              </span>
              <span>
                <span className='italic font-medium'>{t('common.created')}</span>{' '}
                {currentPlace.creation_date}
              </span>
              <span>
                <span className='italic font-medium'>{t('common.founded')}</span>{' '}
                {currentPlace.found_date}
              </span>
              <section className='flex gap-2'>
                <span>
                  <span className='italic font-medium'>{t('common.latitude')}</span>{' '}
                  {currentPlace.lng}
                </span>
                <span>
                  <span className='italic font-medium'>{t('common.longitude')}</span>{' '}
                  {currentPlace.lat}
                </span>
              </section>
              {/* TODO should be username */}
              <span>
                <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                {currentPlace.user}
              </span>
              <span>
                <span className='italic font-medium'>{t('common.type_of')}</span>{' '}
                {currentPlace.sortof}
              </span>
              <span>
                <span className='italic font-medium'>{t('common.type')}</span> {currentPlace.type}
              </span>
              <span>
                <span className='italic font-medium'>{t('common.period')}</span>{' '}
                {currentPlace.period}
              </span>
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
