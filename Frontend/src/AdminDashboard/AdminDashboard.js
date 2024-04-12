import { useDispatch, useSelector } from 'react-redux';
import { adminDeleteActions, selectAdminDelete } from '../Redux/adminDeleteSlice';
import { Suspense } from 'react';
import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';
import Loader from '../Loader/Loader.js';
import AdminModal from '../Modals/AdminModal.js';

function AdminDashboard() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminDelete);

  const handleDeleteAdminModal = () => {
    dispatch(adminDeleteActions.changeIsDeleteAdminModalOpen());
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
        {modalData.isAdminDeleteModalOpen && (
          <AdminModal type='delete' closeModal={handleDeleteAdminModal} />
        )}
      </div>
    </Suspense>
  );
}

export default AdminDashboard;
