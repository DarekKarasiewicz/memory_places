import { useParams } from 'react-router-dom';

import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import AdminTrailActionSection from './AdminManagement/AdminTrailActionSection.js';
import App from 'App.js';

function AdminTrailAction({ action }) {
  const params = useParams();

  return (
    <App>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-full flex flex-col'>
          <ContentNavbar showLogo={true} />
          {action === 'edit' || action === 'view' ? (
            <AdminTrailActionSection action={action} trailId={params.id} />
          ) : (
            <AdminTrailActionSection />
          )}
        </div>
      </div>
    </App>
  );
}

export default AdminTrailAction;
