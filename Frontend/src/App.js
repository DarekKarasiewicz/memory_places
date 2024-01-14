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
import UserMenu from './User/UserMenu';
import { selectUserPlaces } from './Redux/userPlacesSlice';

function App(props) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const addPlaceData = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);

  const handleFormModalVisability = () => {
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const handleLoginModalVisability = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  const handleUpdateModalVisability = () => {
    dispatch(modalsActions.changeIsUpdateModalOpen());
  };

  return (
    <div className='w-screen h-screen relative'>
      {userPlacesData.isOpen && <UserMenu />}
      <GoogleMap />
      {!addPlaceData.isSelecting && <Navbar />}
      {!addPlaceData.isSelecting && <AddPlaceButton openModal={handleFormModalVisability} />}
      {modalData.isFormModalOpen && (
        <FormModal title='Add place' type='create' closeModal={handleFormModalVisability} />
      )}
      {modalData.isLoginAndRegisterOpen && (
        <LoginAndRegisterModal closeModal={handleLoginModalVisability} />
      )}
      {modalData.isUserSettingsOpen && (
        <UserMenuSettings closeModal={handleUserSettingsVisability} />
      )}
      {modalData.isUpdateModalOpen && (
        <FormModal
          title='Update your place'
          type='update'
          closeModal={handleUpdateModalVisability}
        />
      )}
    </div>
  );
}

export default App;
