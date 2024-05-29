import { useParams } from 'react-router-dom';

import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import AdminPlaceActionSection from './AdminManagement/AdminPlaceActionSection.js';
import App from 'App.js';

function AdminPlaceAction({ action }) {
  const params = useParams();

  return (
    <App altVersion={true}>
      <div className='w-full flex flex-col relative'>
        <ContentNavbar showLogo={true} />
        {action === 'edit' || action === 'view' ? (
          <AdminPlaceActionSection action={action} placeId={params.id} />
        ) : (
          <AdminPlaceActionSection />
        )}
      </div>
    </App>
  );
}

export default AdminPlaceAction;
