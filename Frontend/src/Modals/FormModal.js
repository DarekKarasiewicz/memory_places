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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const sortof_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.existing'), value: 'existing' },
    { label: t('modal.non_existing'), value: 'non_existing' },
    { label: t('modal.commemorative_plaque'), value: 'commemorative_plaque' },
    { label: t('modal.commemorative_monument'), value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.war_cemetery'), value: 'war_emetery' },
    { label: t('modal.civil_cemetery'), value: 'civil_cemetery' },
    { label: t('modal.burial_site'), value: 'burial_site' },
    { label: t('modal.execution_site'), value: 'execution_site' },
    { label: t('modal.battlefield'), value: 'battlefield' },
    { label: t('modal.archaeological_site'), value: 'archaeological_site' },
    { label: t('modal.wayside_shrine'), value: 'wayside_shrine' },
    { label: t('modal.historical_monument'), value: 'historical_monument' },
  ];

  const period_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.poland_before_third_partition'), value: 'poland_before_third_partition' },
    { label: t('modal.napoleonic_wars'), value: 'napoleonic_wars' },
    { label: t('modal.poland_after_partitions'), value: 'poland_after_partitions' },
    { label: t('modal.world_war_I'), value: 'world_war_I' },
    { label: t('modal.interwar_period'), value: 'interwar_period' },
    { label: t('modal.world_war_II'), value: 'world_war_II' },
    { label: t('modal.stalinist_period'), value: 'stalinist_period' },
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
      alert(t('modal.filled_box_error'));
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
    <>
      <BaseModal title={props.title} closeModal={props.closeModal}>
        <div className='p-2 max-h-[75vh] overflow-y-auto'>
          <BaseInput
            type='text'
            name='nameInput'
            label={t('common.name')}
            value={addPlaceData.place_name}
            onBlur={() => {
              dispatch(addPlaceActions.changeName(nameRef.current.value));
            }}
            ref={nameRef}
          />
          <BaseInput
            type='date'
            name='dateInput'
            label={t('common.date')}
            ref={dateRef}
            value={addPlaceData.found_date}
            onBlur={() => {
              dispatch(addPlaceActions.changeFoundDate(dateRef.current.value));
            }}
          />
          <div className='flex gap-8'>
            <BaseInput
              type='number'
              placeholder={t('common.latitude')}
              name='lat'
              label={t('common.latitude')}
              value={props.type === 'update' ? lat : addPlaceData.lat}
              ref={latRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeLat(latRef.current.value));
                setLat(latRef.current.value);
              }}
            />
            <BaseInput
              type='number'
              placeholder={t('common.longitude')}
              name='lng'
              label={t('common.longitude')}
              value={props.type === 'update' ? lng : addPlaceData.lng}
              ref={lngRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeLng(lngRef.current.value));
                setLng(lngRef.current.value);
              }}
            />
          </div>
          <div className='p-2 flex justify-center mt-2'>
            <BaseButton
              name={t('common.location_select')}
              btnBg='blue'
              onClick={handleSelectLocationBtn}
            />
          </div>
          <div className='flex gap-8'>
            <BaseSelect
              label={t('common.type_of')}
              name={t('common.type_of')}
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
              label={t('common.type')}
              name={t('common.type')}
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
            label={t('common.period')}
            name={t('common.period')}
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
            label={t('common.description')}
            secondLabel={t('common.description-max')}
            ref={descriptionRef}
            value={addPlaceData.description}
            onBlur={() => {
              dispatch(addPlaceActions.changeDescription(descriptionRef.current.value));
            }}
          />
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton
            type='submit'
            name={t('common.confirm')}
            btnBg='blue'
            onClick={handleConfirm}
          ></BaseButton>
        </div>
      </BaseModal>
    </>
  );
}

export default FormModal;
