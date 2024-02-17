import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';
import FormModal from './Modals/FormModal';
import AddPlaceButton from './AddPlace/AddPlaceButton';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions, selectModals } from './Redux/modalsSlice';
import { selectAddPlaceLocation } from './Redux/addPlaceLocationSlice';
import LoginAndRegisterModal from './Modals/LoginAndRegisterModal';
import UserMenuSettings from './Modals/UserMenuSettingsModal';
import NotificationModal from './Modals/NotificationModal';
import UserPlacesMenu from './User/UserPlacesMenu';
import { selectUserPlaces } from './Redux/userPlacesSlice';
import { addPlaceActions } from './Redux/addPlaceSlice';
import { updatePlaceActions } from './Redux/updatePlaceSlice';
import CookiesInfo from './Cookies/CookieInfo';
import { useCookies } from 'react-cookie';
import { addPlacelocationActions } from './Redux/addPlaceLocationSlice';

function App() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const addPlaceData = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);

  const handleFormModalVisability = () => {
    if (modalData.isFormModalOpen === true) {
      dispatch(addPlaceActions.reset());
    }
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const handleEditFormModalVisability = () => {
    if (modalData.isUpdateModalOpen === true) {
      dispatch(addPlaceActions.reset());
      dispatch(updatePlaceActions.reset());
    }
    dispatch(modalsActions.changeIsUpdateModalOpen());
  };

  const handleLoginModalVisability = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  const handleNotificationModalVisability = () => {
    dispatch(modalsActions.changeIsNotificationModalOpen());
  };

  return (
    <div className='w-screen h-screen relative'>
      {userPlacesData.isOpen && <UserPlacesMenu />}
      <GoogleMap />
      {!addPlaceData.isSelecting && <Navbar />}
      {!addPlaceData.isSelecting && <AddPlaceButton openModal={handleFormModalVisability} />}
      {modalData.isFormModalOpen && (
        <FormModal title='Add place' type='create' closeModal={handleFormModalVisability} />
      )}
      {modalData.isUpdateModalOpen && (
        <FormModal
          title='Edit your place'
          type='update'
          closeModal={handleEditFormModalVisability}
        />
      )}
      {modalData.isLoginAndRegisterOpen && (
        <LoginAndRegisterModal closeModal={handleLoginModalVisability} />
      )}
      {modalData.isUserSettingsOpen && (
        <UserMenuSettings closeModal={handleUserSettingsVisability} />
      )}

      {modalData.isNotificationModalOpen && (
        <NotificationModal
          title='This is warning message!'
          info='Are you sure you want to see this? There is no coming back!'
          type='warning'
          closeModal={handleNotificationModalVisability}
        />
      )}
    </div>
  );
}

export default App;
