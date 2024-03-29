import { useState, Suspense, useEffect } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';
import FormModal from './Modals/FormModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions, selectModals } from './Redux/modalsSlice';
import { selectAddPlaceLocation } from './Redux/addPlaceLocationSlice';
import { addPlacelocationActions } from './Redux/addPlaceLocationSlice';
import LoginAndRegisterModal from './Modals/LoginAndRegisterModal';
import UserMenuSettings from './Modals/UserMenuSettingsModal';
import NotificationModal from './Modals/NotificationModal';
import UserPlacesMenu from './User/UserPlacesMenu';
import { selectUserPlaces } from './Redux/userPlacesSlice';
import { addPlaceActions } from './Redux/addPlaceSlice';
import CookiesInfo from './Cookies/CookieInfo';
import { useCookies } from 'react-cookie';
import { updatePlaceActions } from './Redux/updatePlaceSlice';
import Loader from './Loader/Loader.js';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.js';
import FAQ from './FAQ/FAQ.js';
import Footer from './Footer/Footer.js';
import ContactForm from './Modals/ContactForm.js';
import Infobar from './Navbar/Infobar.jsx';
import { formValidationActions } from './Redux/formValidationSlice.jsx';

function App() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const addPlaceData = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);
  const [showCookiesInfo, setShowCookiesInfo] = useState(false);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();

  const handleFormModalVisability = () => {
    if (modalData.isFormModalOpen === true) {
      dispatch(addPlaceActions.reset());
      dispatch(addPlacelocationActions.clearLocation());
      dispatch(formValidationActions.reset());
    }
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const handleEditFormModalVisability = () => {
    if (modalData.isUpdateModalOpen === true) {
      dispatch(addPlaceActions.reset());
      dispatch(updatePlaceActions.reset());
      dispatch(addPlacelocationActions.clearLocation());
      dispatch(formValidationActions.reset());
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

  const handleCookiesInfoVisability = () => {
    dispatch(modalsActions.changeIsCookiesInfoOpen());
  };

  const handleFAQVisability = () => {
    dispatch(modalsActions.changeIsFAQOpen());
  };

  const handleContactFormVisability = () => {
    dispatch(modalsActions.changeIsContactFormOpen());
  };

  useEffect(() => {
    if (user) {
      if (user.cookies === false) {
        setShowCookiesInfo(true);
      }
    } else {
      setShowCookiesInfo(true);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-screen relative'>
        {userPlacesData.isOpen && <UserPlacesMenu />}
        <GoogleMap />
        {!addPlaceData.isSelecting && <Navbar />}
        {addPlaceData.isSelecting && <Infobar />}
        {modalData.isFormModalOpen && (
          <FormModal
            title={t('common.add_place')}
            type='create'
            closeModal={handleFormModalVisability}
          />
        )}
        {modalData.isUpdateModalOpen && (
          <FormModal
            title={t('common.edit_place')}
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
            title={t('common.warning_title')}
            info={t('common.warning_info')}
            type='warning'
            closeModal={handleNotificationModalVisability}
          />
        )}

        {/* TO DO Save user cookie preferences in db */}
        {showCookiesInfo && modalData.isCookiesInfoOpen && (
          <CookiesInfo closeModal={handleCookiesInfoVisability} />
        )}

        {modalData.isFAQOpen && <FAQ closeModal={handleFAQVisability} />}

        {modalData.isContactFormOpen && <ContactForm closeModal={handleContactFormVisability} />}

        {!addPlaceData.isSelecting && <Footer />}

        {!addPlaceData.isSelecting && <LanguageSwitcher />}
      </div>
    </Suspense>
  );
}

export default App;
