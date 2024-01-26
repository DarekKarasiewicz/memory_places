import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function RoleSettings() {
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setCurrentRole(decodedToken.admin ? 'admin' : 'user');
    }
  }, []);
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Role</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center'>
          Your current role:
          <span className='capitalize font-medium'>{currentRole}</span>
        </div>
        {currentRole === 'user' && (
          <span className='text-center italic text-lg'>
            If you want to become moderator, send your application via form in user help section.
          </span>
        )}
      </div>
    </div>
  );
}

export default RoleSettings;
