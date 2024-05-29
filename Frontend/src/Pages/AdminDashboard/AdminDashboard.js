import { useDispatch, useSelector } from 'react-redux';
import { adminActions, selectAdminAction } from 'Redux/adminActionSlice';

import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';
import AdminModal from 'Components/Modals/AdminModal.js';
import AdminForumActionModal from './AdminManagement/AdminForumActionModal.js';
import App from 'App.js';

function AdminDashboard() {
  const dispatch = useDispatch();
  const modalAdminAction = useSelector(selectAdminAction);

  const handleAdminActionModal = () => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
  };

  return (
    <App altVersion={true}>
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
        {modalAdminAction.isAdminForumModalOpen && <AdminForumActionModal />}
      </div>
    </App>
  );
}

export default AdminDashboard;
