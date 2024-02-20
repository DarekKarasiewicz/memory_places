import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

function RoleSettings() {
  const [currentRole, setCurrentRole] = useState(null);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setCurrentRole(user.admin ? t('user.admin') : t('user.user'));
    }
  }, []);
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>{t('user.role')}</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center'>
          {t('user.current_role')}
          <span className='capitalize font-medium'>{currentRole}</span>
        </div>
        {!user.admin && (
          <span className='text-center italic text-lg'>{t('user.promo_role_info')}</span>
        )}
      </div>
    </div>
  );
}

export default RoleSettings;
