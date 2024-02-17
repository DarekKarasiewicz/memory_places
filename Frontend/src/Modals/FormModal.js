import { useState, useEffect, useRef, Fragment, useMemo } from 'react';
import axios from 'axios';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
import BaseSelect from '../Base/BaseSelect';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from '../Redux/addPlaceLocationSlice';
import { modalsActions } from '../Redux/modalsSlice';
import { selectUpdatePlace, updatePlaceActions } from '../Redux/updatePlaceSlice';
import { addPlaceActions, selectAddPlace } from '../Redux/addPlaceSlice';
import { useCookies } from 'react-cookie';

function FormModal(props) {
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const dateRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const descriptionRef = useRef();
  const sortofRef = useRef();
  const typeRef = useRef();
  const periodRef = useRef();
  const updatePlaceData = useSelector(selectUpdatePlace);
  const addPlaceData = useSelector(selectAddPlace);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const sortof_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Istniejące', value: 'existing' },
    { label: 'Nieistniejące', value: 'non_existing' },
    { label: 'Tablica upamiętniająca', value: 'commemorative_plaque' },
    { label: 'Pomnik upamiętniający', value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Cmentarz wojenny', value: 'war_cemetery' },
    { label: 'Cmentarz cywilny', value: 'civilian_cemetery' },
    { label: 'Miejsce pochówku', value: 'burial_site' },
    { label: 'Miejsce egzekucji, straceń', value: 'place_of_executions' },
    { label: 'Miejsce bitwy, potyczki', value: 'place_of_battle_skirmish' },
    { label: 'Miejsce archeologiczne', value: 'archaeological_site' },
    { label: 'Kapliczka', value: 'chapel' },
    { label: 'Zabytek', value: 'monument' },
  ];

  const period_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Polska przed 3cim rozbiorem  (< 1795)', value: 'poland_before_third_partition' },
    { label: 'Wojny Napoleońskie (1799 – 1815)', value: 'napoleonic_wars' },
    { label: 'Polska po rozbiorach (1795 – 1914)', value: 'poland_after_partitions' },
    { label: 'I Wojna Światowa (1914 – 1918)', value: 'world_war_I' },
    { label: 'Okres Międzywojenny (1918 – 1939)', value: 'interwar_period' },
    { label: 'II Wojna Światowa (1939 – 1945)', value: 'world_war_II' },
    { label: 'Okres Stalinowski (1945 – 1953)', value: 'stalinist_period' },
  ];

  useEffect(() => {
    dispatch(addPlaceActions.changeLat(addPlaceLocation.lat));
    dispatch(addPlaceActions.changeLng(addPlaceLocation.lng));
  }, [addPlaceLocation]);

  useEffect(() => {
    if (props.type === 'update' && updatePlaceData.isDataLoaded === false) {
      dispatch(addPlaceActions.changeName(updatePlaceData.place.place_name));
      dispatch(addPlaceActions.changeDescription(updatePlaceData.place.description));
      dispatch(addPlaceActions.changeFoundDate(updatePlaceData.place.found_date));
      dispatch(addPlaceActions.changeLat(updatePlaceData.place.lat));
      updatePlaceData.place.lat;
      setLat(updatePlaceData.place.lat);
      dispatch(addPlaceActions.changeLng(updatePlaceData.place.lng));
      setLng(updatePlaceData.place.lng);
      dispatch(addPlaceActions.changeSortOf(updatePlaceData.place.sortof));
      dispatch(addPlaceActions.changeType(updatePlaceData.place.type));
      dispatch(addPlaceActions.changePeriod(updatePlaceData.place.period));
      dispatch(updatePlaceActions.dataIsLoaded());
    }
  }, []);

  useEffect(() => {
    if (updatePlaceData.isDataLoaded === true) {
      dispatch(addPlaceActions.changeLat(addPlaceLocation.lat));
      dispatch(addPlaceActions.changeLng(addPlaceLocation.lng));
      setLat(addPlaceLocation.lat);
      setLng(addPlaceLocation.lng);
    }
  }, []);

  const formValidation = () => {
    if (
      addPlaceData.place_name.lenght > 0 &&
      addPlaceData.description.lenght > 0 &&
      addPlaceData.found_date.lenght > 0 &&
      addPlaceData.lat > 0 &&
      addPlaceData.lng > 0 &&
      addPlaceData.sortof !== 'all' &&
      addPlaceData.type !== 'all' &&
      addPlaceData.period !== 'all'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleConfirm = () => {
    const isFormValid = formValidation();

    if (isFormValid) {
      if (props.type === 'update') {
        axios
          .put(`http://localhost:8000/memo_places/places/${updatePlaceData.place.id}/`, {
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            found_date: addPlaceData.found_date,
            lat: addPlaceData.lat,
            lng: addPlaceData.lng,
            sortof: addPlaceData.sortof,
            type: addPlaceData.type,
            period: addPlaceData.period,
          })
          .then(() => {
            dispatch(addPlaceActions.reset());
            dispatch(updatePlaceActions.reset());
            dispatch(modalsActions.changeIsUpdateModalOpen());
          });
      } else {
        axios
          .post(`http://localhost:8000/memo_places/places/`, {
            user: user.id,
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            found_date: addPlaceData.found_date,
            lat: addPlaceData.lat,
            lng: addPlaceData.lng,
            sortof: addPlaceData.sortof,
            type: addPlaceData.type,
            period: addPlaceData.period,
          })
          .then(() => {
            dispatch(addPlaceActions.reset());
            dispatch(addPlacelocationActions.resetLocation());
            dispatch(modalsActions.changeIsFormModalOpen());
          });
      }
    } else {
      alert('All boxes need to be filled');
    }
  };

  const handleSelectLocationBtn = () => {
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: true }));
    if (props.type === 'update') {
      dispatch(modalsActions.changeIsUpdateModalOpen());
    } else {
      dispatch(modalsActions.changeIsFormModalOpen());
    }
  };

  return (
    <Fragment>
      <BaseModal title={props.title} closeModal={props.closeModal}>
        <div className='p-2 max-h-[75vh] overflow-y-auto'>
          <BaseInput
            type='text'
            name='nameInput'
            label='Name'
            value={addPlaceData.place_name}
            onBlur={() => {
              dispatch(addPlaceActions.changeName(nameRef.current.value));
            }}
            ref={nameRef}
          />
          <BaseInput
            type='date'
            name='dateInput'
            label='Date'
            ref={dateRef}
            value={addPlaceData.found_date}
            onBlur={() => {
              dispatch(addPlaceActions.changeFoundDate(dateRef.current.value));
            }}
          />
          <div className='flex gap-8'>
            <BaseInput
              type='number'
              placeholder='latitude'
              name='lat'
              label='latitude'
              value={props.type === 'update' ? lat : addPlaceData.lat}
              ref={latRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeLat(latRef.current.value));
                setLat(latRef.current.value);
              }}
            />
            <BaseInput
              type='number'
              placeholder='longitude'
              name='lng'
              label='longitude'
              value={props.type === 'update' ? lng : addPlaceData.lng}
              ref={lngRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeLng(lngRef.current.value));
                setLng(lngRef.current.value);
              }}
            />
          </div>
          <div className='p-2 flex gap-4 justify-center'>
            <BaseButton name='Select location' onClick={handleSelectLocationBtn} />
          </div>
          <div className='flex gap-8'>
            <BaseSelect
              label='Rodzaj'
              name='Rodzaj'
              value={
                props.type === 'update' && !updatePlaceData.isDataLoaded
                  ? updatePlaceData.place.sortof
                  : addPlaceData.sortof
              }
              options={sortof_options}
              ref={sortofRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeSortOf(sortofRef.current.value));
              }}
            />
            <BaseSelect
              label='Typ'
              name='Typ'
              value={
                props.type === 'update' && !updatePlaceData.isDataLoaded
                  ? updatePlaceData.place.type
                  : addPlaceData.type
              }
              options={type_options}
              ref={typeRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeType(typeRef.current.value));
              }}
            />
          </div>
          <BaseSelect
            label='Okres'
            name='Okres'
            value={
              props.type === 'update' && !updatePlaceData.isDataLoaded
                ? updatePlaceData.place.period
                : addPlaceData.period
            }
            options={period_options}
            ref={periodRef}
            onBlur={() => {
              dispatch(addPlaceActions.changePeriod(periodRef.current.value));
            }}
          />
          <BaseTextarea
            rows='6'
            label='Description'
            ref={descriptionRef}
            value={addPlaceData.description}
            onBlur={() => {
              dispatch(addPlaceActions.changeDescription(descriptionRef.current.value));
            }}
          />
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton type='submit' name='Confirm' onClick={handleConfirm}></BaseButton>
        </div>
      </BaseModal>
    </Fragment>
  );
}

export default FormModal;
