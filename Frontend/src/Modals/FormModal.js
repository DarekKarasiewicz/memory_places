import { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios'
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
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
  
  const handleConfirm =()=>{
    const place = {
      userId: null,
      placeName: nameRef.current.value,
      description: descriptionRef.current.value,
      creationDate: new Date(),
      foundDate: dateRef.current.value,
      lat: latRef.current.value,
      lng: lngRef.current.value
    }

    const isFormValid = formValidation();

    if (isFormValid) {
      // axios.post(`http://localhost:8000/memo_places/places/`,{place}).then(() => {
      //   dispatch(formModalActions.changeIsModalOpen())
      // })
      console.log(place)
    }else{
      alert("All boxes need to be filled");
    }

  }

  const formValidation = () =>{
    if(nameRef.current.value.length > 0 &&
      descriptionRef.current.value.length > 0 &&
      dateRef.current.value.length > 0 &&
      latRef.current.value.length > 0 &&
      lngRef.current.value.length > 0){
        return true
      }else{
        return false
      }
  }

  useEffect(() => {
    if(latRef.current){
      latRef.current.value = addPlaceLocation.lat
      lngRef.current.value = addPlaceLocation.lng
    }
  },[addPlaceLocation])

  const handleSelectLocationBtn = () =>{
    dispatch(addPlacelocationActions.changeIsSelecting({isSelecting: true}));
    dispatch(formModalActions.changeIsModalOpen())
    
  }

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
            <BaseInput
              type='date'
              name='dateInput'
              label='Date'
              ref={dateRef}
              />
              <div className='flex flex-row'>
                <BaseInput
                  type='number'
                  placeholder='latitude'
                  name='lat'
                  label='latitude'
                  width='1/2'
                  ref={latRef}
                  />
                <BaseInput
                  type='number'
                  placeholder='longitude'
                  name='lng'
                  label='longitude'
                  width='1/2'
                  value={addPlaceLocation.lng}
                  ref={lngRef}
                  />
              </div>
              <div className='p-2 flex gap-4 justify-center'>
              <BaseButton name='Select location' onClick={handleSelectLocationBtn}/>
              </div>
          <BaseTextarea rows='6' label='Description' ref={descriptionRef}/>
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton type='submit' name='Confirm' onClick={handleConfirm}></BaseButton>
        </div>
      </BaseModal>
    </Fragment>
  );
}

export default FormModal;
