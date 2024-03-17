import { Suspense } from 'react';
import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';
import Loader from '../Loader/Loader.js';

function AdminDashboard() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-screen relative flex'>
        <div className='w-64 p-4 flex justify-center shadow-lg'>
          <AdminMenu />
        </div>
        <div className='w-full flex flex-col overflow-x-hidden'>
          <ContentNavbar />
          <Content />
        </div>
      </div>
    </Suspense>
  );
}

export default AdminDashboard;
