import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseModal from '../Base/BaseModal';
import AccountSettings from '../Navbar/UserMenu/UserMenuSettings/AccountSettings';
import SecuritySettings from '../Navbar/UserMenu/UserMenuSettings/SecuritySettings';
import RoleSettings from '../Navbar/UserMenu/UserMenuSettings/RoleSettings';
import NotificiationsSettings from '../Navbar/UserMenu/UserMenuSettings/NotificiationsSettings';
import LanguageSettings from '../Navbar/UserMenu/UserMenuSettings/LanguageSettings';
import PreferencesSettings from '../Navbar/UserMenu/UserMenuSettings/PreferencesSettings';
import { useTranslation } from 'react-i18next';

function UserMenuSettingsModal(props) {
  const [currentOption, setCurrentOption] = useState(null);
  const { t } = useTranslation();

  const handleCurrentOption = (option) => {
    setCurrentOption(option);
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

  return (
    <>
      <BaseModal closeModal={props.closeModal} width='2/6'>
        <div className='flex p-2'>
          <div className='w-2/6 text-xl flex flex-col gap-2 pr-4'>
            <div>{t('user.general')}</div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'account' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'account' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('account')}
            >
              <img src='./assets/account_icon.svg' alt='account_icon' className='h-5 w-5' />
              {t('user.account')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'security' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'security' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('security')}
            >
              <img src='./assets/shield_lock_icon.svg' alt='shield_lock_icon' className='h-5 w-5' />
              {t('user.security')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'role' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'role' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('role')}
            >
              <img src='./assets/user_role_icon.svg' alt='user_role_icon' className='h-5 w-5' />
              {t('user.role')}
            </motion.div>
            <div>{t('user.system')}</div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'notificiations' ? 'bg-red-600' : ''
              }`}
              whileHover={{
                scale: 1.1,
                color: currentOption === 'notificiations' ? 'white' : 'red',
              }}
              onClick={() => handleCurrentOption('notificiations')}
            >
              <img
                src='./assets/notification_icon.svg'
                alt='notification_icon'
                className='h-5 w-5'
              />
              {t('user.notificiations')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'language' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'language' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('language')}
            >
              <img src='./assets/language_icon.svg' alt='preferences_icon' className='h-5 w-5' />
              {t('user.language')}
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'preferences' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'preferences' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('preferences')}
            >
              <img src='./assets/preferences_icon.svg' alt='preferences_icon' className='h-5 w-5' />
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
