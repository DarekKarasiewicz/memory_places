import { Suspense } from 'react';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import AdminPlaceAddSection from './AdminManagement/AdminPlaceAddSection.js';
import Loader from '../Loader/Loader.js';

function AdminPlaceAdd() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-full flex flex-col'>
          <ContentNavbar showLogo={true} />
          <AdminPlaceAddSection />
        </div>
      </div>
    </Suspense>
  );
}

export default AdminPlaceAdd;
