import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BaseModal from 'Base/BaseModal';
import AccountSettings from 'Navbar/UserMenu/UserMenuSettings/AccountSettings';
import SecuritySettings from 'Navbar/UserMenu/UserMenuSettings/SecuritySettings';
import RoleSettings from 'Navbar/UserMenu/UserMenuSettings/RoleSettings';
import NotificiationsSettings from 'Navbar/UserMenu/UserMenuSettings/NotificiationsSettings';
import LanguageSettings from 'Navbar/UserMenu/UserMenuSettings/LanguageSettings';
import PreferencesSettings from 'Navbar/UserMenu/UserMenuSettings/PreferencesSettings';
import { useTranslation } from 'react-i18next';
import { modalsActions } from 'Redux/modalsSlice';
import { useDispatch } from 'react-redux';

import AccountIcon from 'icons/AccountIcon';
import ShieldLockIcon from 'icons/ShieldLockIcon';
import UserRoleIcon from 'icons/UserRoleIcon';
import NotificationIcon from 'icons/NotificationIcon';
import LanguageIcon from 'icons/LanguageIcon';
import PreferencesIcon from 'icons/PreferencesIcon';

function UserMenuSettingsModal(props) {
  const [currentOption, setCurrentOption] = useState('account');
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleCurrentOption = (option) => {
    setCurrentOption(option);
  };

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  let contentComponent;

  switch (currentOption) {
    case 'account':
      contentComponent = <AccountSettings />;
      break;
    case 'security':
      contentComponent = <SecuritySettings />;
      break;
    case 'role':
      contentComponent = <RoleSettings />;
      break;
    case 'notificiations':
      contentComponent = <NotificiationsSettings />;
      break;
    case 'language':
      contentComponent = <LanguageSettings />;
      break;
    case 'preferences':
      contentComponent = <PreferencesSettings />;
      break;
    default:
      contentComponent = <AccountSettings />;
      break;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleUserSettingsVisability();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <BaseModal closeModal={props.closeModal} minHeight='min-h-[calc(100vh/2)]'>
        <div ref={modalRef} className='flex p-2'>
          <div className='w-2/6 text-xl flex flex-col gap-3 pr-4'>
            <div className='text-2xl'>{t('user.general')}</div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'account'
                  ? 'text-contrastColor border-l-2 border-contrastColor'
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('account')}
            >
              <AccountIcon className='h-6 w-6' />
              {t('user.account')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'security'
                  ? 'text-contrastColor border-l-2 border-contrastColor'
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('security')}
            >
              <ShieldLockIcon className='h-6 w-6' />
              {t('user.security')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'role' ? 'text-contrastColor border-l-2 border-contrastColor' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('role')}
            >
              <UserRoleIcon className='h-6 w-6' />
              {t('user.role')}
            </motion.div>
            <div className='text-2xl'>{t('user.system')}</div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'notificiations'
                  ? 'text-contrastColor border-l-2 border-contrastColor'
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('notificiations')}
            >
              <NotificationIcon className='h-6 w-6' />
              {t('user.notifications')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'language'
                  ? 'text-contrastColor border-l-2 border-contrastColor'
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('language')}
            >
              <LanguageIcon className='h-6 w-6' />
              {t('user.language')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-xl pl-2 hover:text-contrastColor hover:border-l-2 hover:border-contrastColor ${
                currentOption === 'preferences'
                  ? 'text-contrastColor border-l-2 border-contrastColor'
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCurrentOption('preferences')}
            >
              <PreferencesIcon className='h-6 w-6' />
              {t('user.preferences')}
            </motion.div>
          </div>
          <div className='w-4/6 text-xl'>{contentComponent}</div>
        </div>
      </BaseModal>
    </>
  );
}

export default UserMenuSettingsModal;
