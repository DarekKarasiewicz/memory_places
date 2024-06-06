import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { adminActions, selectAdminAction } from 'Redux/adminActionSlice';

import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';
import AdminModal from 'Components/Modals/AdminModal.js';
import AdminForumActionModal from './AdminManagement/AdminForumActionModal.js';
import App from 'App.js';
import ArrowLeftIcon from 'icons/ArrowLeftIcon.jsx';
import ArrowRightIcon from 'icons/ArrowRightIcon.jsx';
import TrailGuideModal from 'Components/Modals/TrailGuideModal.js';

function AdminDashboard() {
  const dispatch = useDispatch();
  const modalAdminAction = useSelector(selectAdminAction);
  const [isVisible, setIsVisible] = useState(true);

  const handleAdminActionModal = () => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
  };

  const changeMenuVisibility = () => {
    setIsVisible((previousState) => !previousState);
  };

  return (
    <App altVersion={true}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        {isVisible && (
          <div className='w-64 p-4 flex justify-center shadow-lg bg-mainBgColor relative'>
            <AdminMenu />
            <div
              className='absolute top-24 -right-7 flex justify-center items-center h-12 w-8 bg-mainBgColor rounded-r-lg cursor-pointer'
              onClick={() => changeMenuVisibility()}
            >
              <ArrowLeftIcon className='h-8 w-8' />
            </div>
          </div>
        )}
        <div className='w-full flex flex-col'>
          <ContentNavbar />
          <Content />
        </div>
        {modalAdminAction.isAdminActionsModalOpen && (
          <AdminModal closeModal={handleAdminActionModal} />
        )}
        {modalAdminAction.isAdminForumModalOpen && <AdminForumActionModal />}
        {!isVisible && (
          <div
            className='absolute top-24 left-0 flex justify-center items-center h-12 w-8 bg-mainBgColor rounded-r-lg cursor-pointer'
            onClick={() => changeMenuVisibility()}
          >
            <ArrowRightIcon className='h-8 w-8' />
          </div>
        )}
      </div>
    </App>
  );
}

export default AdminDashboard;
