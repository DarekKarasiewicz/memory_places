import AdminMenu from './AdminMenu/AdminMenu.js';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/Content.js';

function AdminDashboard() {
  return (
    <div className='w-screen h-screen relative flex'>
      <div className='w-56 p-4 flex justify-center'>
        <AdminMenu />
      </div>
      <div className='w-auto flex flex-col'>
        <ContentNavbar />
        <Content />
      </div>
    </div>
  );
}

export default AdminDashboard;
