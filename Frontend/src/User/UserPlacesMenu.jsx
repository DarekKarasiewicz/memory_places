import UserPlacesList from './UserPlacesList';

const UserMenu = () => {
  return (
    <div className='absolute bottom-0 left-0 w-1/3 h-screen bg-slate-300 pb-5'>
      <UserPlacesList />
    </div>
  );
};

export default UserMenu;
