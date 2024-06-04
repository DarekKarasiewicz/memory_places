import { useState, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { modalsActions, selectModals } from './Redux/modalsSlice';
import { selectConfirmationModal } from 'Redux/confirmationModalSlice';
import { selectNotificationModal } from 'Redux/notificationModalSlice';

import LoginAndRegisterModal from './Components/Modals/LoginAndRegisterModal';
import UserMenuSettings from './Components/Modals/UserMenuSettingsModal';
import NotificationModal from './Components/Modals/NotificationModal';
import CookiesInfo from './Components/Cookies/CookieInfo';
import Loader from './Components/Loader/Loader.js';
import FAQ from './Components/FAQ/FAQ.js';
import ContactForm from './Components/Modals/ContactForm.js';
import ConfirmationModal from 'Components/Modals/ConfirmationModal.js';
import FoundationInfo from 'Components/Modals/FoundationInfo';
import ScrollToTopButton from 'Components/ScrollToTopButton/ScrollToTopButton';

function App({ children, altVersion }) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const [showCookiesInfo, setShowCookiesInfo] = useState(false);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const confirmationModal = useSelector(selectConfirmationModal);
  const notificationModal = useSelector(selectNotificationModal);

  const handleLoginModalVisability = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
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

  const handleFoundationInfoVisability = () => {
    dispatch(modalsActions.changeIsFoundationInfoOpen());
  };

  useEffect(() => {
    if (!user || !user.user_id) {
      if (localStorage.getItem('cookiesAccepted')) {
        setShowCookiesInfo(false);
      } else {
        setShowCookiesInfo(true);
      }
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`w-screen relative ${
          altVersion ? 'h-auto flex max-w-full overflow-x-hidden' : 'h-screen'
        }`}
      >
        {children}
        {modalData.isLoginAndRegisterOpen && (
          <LoginAndRegisterModal closeModal={handleLoginModalVisability} />
        )}
        {modalData.isUserSettingsOpen && (
          <UserMenuSettings closeModal={handleUserSettingsVisability} />
        )}
        {notificationModal.isNotificationModalOpen && <NotificationModal />}

        {showCookiesInfo && modalData.isCookiesInfoOpen && (
          <CookiesInfo closeModal={handleCookiesInfoVisability} />
        )}

        {modalData.isFAQOpen && <FAQ closeModal={handleFAQVisability} />}

        {modalData.isContactFormOpen && <ContactForm closeModal={handleContactFormVisability} />}

        {modalData.isFoundationInfoOpen && (
          <FoundationInfo closeModal={handleFoundationInfoVisability} />
        )}

        {confirmationModal.isConfirmationModalOpen && <ConfirmationModal />}
        <ScrollToTopButton />
      </div>
    </Suspense>
  );
}

export default App;
