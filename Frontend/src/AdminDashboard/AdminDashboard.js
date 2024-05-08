import { useDispatch, useSelector } from 'react-redux';
import { adminActions, selectAdminAction } from 'Redux/adminActionSlice';
import { selectConfirmationModal } from 'Redux/confirmationModalSlice';
import { Suspense } from 'react';
import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';
import Loader from 'Loader/Loader.js';
import AdminModal from 'Modals/AdminModal.js';
import ConfirmationModal from 'Modals/ConfirmationModal.js';
import NotificationModal from 'Modals/NotificationModal';
import { selectNotificationModal } from 'Redux/notificationModalSlice.jsx';

function AdminDashboard() {
  const dispatch = useDispatch();
  const modalAdminAction = useSelector(selectAdminAction);
  const confirmationModal = useSelector(selectConfirmationModal);
  const notificationModal = useSelector(selectNotificationModal);

  const handleAdminActionModal = () => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-64 p-4 flex justify-center shadow-lg bg-mainBgColor'>
          <AdminMenu />
        </div>
        <div className='w-full flex flex-col'>
          <ContentNavbar />
          <Content />
        </div>
        {modalAdminAction.isAdminActionsModalOpen && (
          <AdminModal closeModal={handleAdminActionModal} />
        )}
        {confirmationModal.isConfirmationModalOpen && <ConfirmationModal />}
        {notificationModal.isNotificationModalOpen && <NotificationModal />}
      </div>
    </Suspense>
  );
}

export default AdminDashboard;
