import { useState } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';
import FormModal from './Modals/FormModal';
import AddPlaceButton from './AddPlace/AddPlaceButton';
import { useDispatch, useSelector } from 'react-redux';
import { formModalActions, selectFormModal } from './Redux/formModalSlice';
import { selectAddPlaceLocation } from './Redux/addPlaceLocationSlice';

function App(props) {
  const dispatch = useDispatch();
  const formModalData = useSelector(selectFormModal);
  const addPlaceData = useSelector(selectAddPlaceLocation);

  const handleModalVisability = () =>{
    dispatch(formModalActions.changeIsModalOpen());
  }

  return (
    <div className='w-screen h-screen relative'>
      <GoogleMap />
      {!addPlaceData.isSelecting && <Navbar />}
      {!addPlaceData.isSelecting && <AddPlaceButton openModal={handleModalVisability}/>}
      {formModalData.isModalOpen && <FormModal title='Add place' closeModal={handleModalVisability}/>}
    </div>
  );
}

export default App;