import UserPlacesList from './UserPlacesList';
import BaseButton from '../Base/BaseButton';
import { jwtDecode } from 'jwt-decode';

const UserMenu = () => {
  return (
    <div className='absolute bottom-0 left-0 w-1/3 h-screen bg-slate-300 pb-5'>
      <UserPlacesList />
    </div>
  );
};

export default UserMenu;
