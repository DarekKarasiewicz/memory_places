import { useState } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';
import FormModal from './Modals/FormModal';
import AddPlaceButton from './AddPlace/AddPlaceButton';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions, selectModals } from './Redux/modalsSlice';
import { selectAddPlaceLocation } from './Redux/addPlaceLocationSlice';
import LoginAndRegisterModal from './Modals/LoginAndRegisterModal';
import UserMenuSettings from './Modals/UserMenuSettingsModal';

function App(props) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const addPlaceData = useSelector(selectAddPlaceLocation);

  const handleFormModalVisability = () => {
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const handleLoginModalVisability = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  return (
    <div className='w-screen h-screen relative'>
      <GoogleMap />
      {!addPlaceData.isSelecting && <Navbar />}
      {!addPlaceData.isSelecting && <AddPlaceButton openModal={handleFormModalVisability} />}
      {modalData.isFormModalOpen && (
        <FormModal title='Add place' closeModal={handleFormModalVisability} />
      )}
      {modalData.isLoginAndRegisterOpen && (
        <LoginAndRegisterModal closeModal={handleLoginModalVisability} />
      )}
      {modalData.isUserSettingsOpen && (
        <UserMenuSettings closeModal={handleUserSettingsVisability} />
      )}
    </div>
  );
}

export default App;
