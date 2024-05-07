import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import UserRoleIcon from 'icons/UserRoleIcon';

function RoleSettings() {
  const [currentRole, setCurrentRole] = useState(null);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();

  const parentItem = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    if (user) {
      setCurrentRole(user.admin ? t('user.admin') : t('user.user'));
    }
  }, []);
  return (
    <motion.div variants={parentItem} initial='hidden' animate='visible'>
      <div className='border-b-2 border-textColor pr-2 pb-2 pl-2 text-2xl flex gap-2'>
        <UserRoleIcon />
        <span>{t('user.role')}</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-4'>
        <div className='flex flex-col items-center'>
          {t('user.current_role')}
          <span className='capitalize font-medium'>{currentRole}</span>
        </div>
        {!user.admin && (
          <span className='text-center italic text-lg'>{t('user.promo_role_info')}</span>
        )}
      </div>
    </motion.div>
  );
}

export default RoleSettings;
