import { Suspense } from 'react';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import AdminPlaceActionSection from './AdminManagement/AdminPlaceActionSection.js';
import Loader from 'Loader/Loader.js';
import { useParams } from 'react-router-dom';

function AdminPlaceAction({ action }) {
  const params = useParams();

  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-full flex flex-col'>
          <ContentNavbar showLogo={true} />
          {action === 'edit' || action === 'view' ? (
            <AdminPlaceActionSection action={action} placeId={params.id} />
          ) : (
            <AdminPlaceActionSection />
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default AdminPlaceAction;
