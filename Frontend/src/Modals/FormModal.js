import { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
import BaseSelect from '../Base/BaseSelect';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from '../Redux/addPlaceLocationSlice';
import { formModalActions } from '../Redux/formModalSlice';

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

  const sortof_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Istniejące', value: 'existing' },
    { label: 'Nieistniejące', value: 'non_existing' },
    { label: 'Tablica upamiętniająca', value: 'commemorative_plaque' },
    { label: 'Pomnik upamiętniający', value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Cmentarz wojenny', value: 'war_emetery' },
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

  const handleConfirm = () => {
    const place = {
      userId: null,
      placeName: nameRef.current.value,
      description: descriptionRef.current.value,
      foundDate: dateRef.current.value,
      lat: latRef.current.value,
      lng: lngRef.current.value,
      sortof: sortofRef.current.value,
      type: typeRef.current.value,
      period: periodRef.current.value,
    };

    const isFormValid = formValidation();

    if (isFormValid) {
      // axios.post(`http://localhost:8000/memo_places/places/`,{place}).then(() => {
      //   dispatch(formModalActions.changeIsModalOpen())
      // })
      console.log(place);
    } else {
      alert('All boxes need to be filled');
    }
  };

  const formValidation = () => {
    if (
      nameRef.current.value.length > 0 &&
      descriptionRef.current.value.length > 0 &&
      dateRef.current.value.length > 0 &&
      latRef.current.value.length > 0 &&
      lngRef.current.value.length > 0 &&
      sortofRef.current.value !== 'all' &&
      typeRef.current.value !== 'all' &&
      periodRef.current.value !== 'all'
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (latRef.current) {
      latRef.current.value = addPlaceLocation.lat;
      lngRef.current.value = addPlaceLocation.lng;
    }
  }, [addPlaceLocation]);

  const handleSelectLocationBtn = () => {
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: true }));
    dispatch(formModalActions.changeIsModalOpen());
  };

  return (
    <Fragment>
      <BaseModal title={props.title} isOpen={props.isOpen} closeModal={props.closeModal}>
        <div className='p-2 max-h-[75vh] overflow-y-auto'>
          <BaseInput
            type='text'
            placeholder='Search...'
            name='nameInput'
            label='Name'
            ref={nameRef}
          />
          <BaseInput type='date' name='dateInput' label='Date' ref={dateRef} />
          <div className='flex gap-8'>
            <BaseInput
              type='number'
              placeholder='latitude'
              name='lat'
              label='latitude'
              value={addPlaceLocation.lat}
              ref={latRef}
            />
            <BaseInput
              type='number'
              placeholder='longitude'
              name='lng'
              label='longitude'
              value={addPlaceLocation.lng}
              ref={lngRef}
            />
          </div>
          <div className='p-2 flex gap-4 justify-center'>
            <BaseButton name='Select location' onClick={handleSelectLocationBtn} />
          </div>
          <div className='flex gap-8'>
            <BaseSelect
              label='Rodzaj'
              name='Rodzaj'
              value={addPlaceLocation.sortof}
              options={sortof_options}
              ref={sortofRef}
            />
            <BaseSelect
              label='Typ'
              name='Typ'
              value={addPlaceLocation.type}
              options={type_options}
              ref={typeRef}
            />
          </div>
          <BaseSelect
            label='Okres'
            name='Okres'
            value={addPlaceLocation.period}
            options={period_options}
            ref={periodRef}
          />
          <BaseTextarea rows='6' label='Description' ref={descriptionRef} />
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton type='submit' name='Confirm' onClick={handleConfirm}></BaseButton>
        </div>
      </BaseModal>
    </Fragment>
  );
}

export default FormModal;
