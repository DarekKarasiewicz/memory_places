import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseButton from '../Base/BaseButton';

function AccountComponent() {
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Account</div>
      <div className='flex gap-4 h-14 items-center my-4'>
        <div className='relative'>
          <img
            className='rounded-full w-14 h-14 p-1 border-black border-2'
            src='./assets/user_icon.svg'
            alt='user_square_icon'
          ></img>
          {/* In future on click possibility to change user avatar */}
          <motion.img
            whileHover={{ backgroundColor: '#FF0000' }}
            className='absolute -bottom-2 -right-2 h-8 p-1 bg-slate-300 border-black border rounded-full cursor-pointer'
            src='./assets/edit_icon.svg'
            alt='edit_icon'
          ></motion.img>
        </div>

        <div className='flex flex-col leading-5'>
          <span className='text-lg'>name surname</span>
          <span className='text-sm'>role</span>
        </div>
      </div>
      <div className='border-black border-t-2 py-2 gap-2 flex flex-col items-center'>
        <BaseInput type='text' placeholder='Name' name='nameInput' label='Name'></BaseInput>
        <BaseInput
          type='text'
          placeholder='Surname'
          name='surnameInput'
          label='Surname'
        ></BaseInput>
        <BaseInput type='text' placeholder='Email' name='emailInput' label='Email'></BaseInput>
        <BaseButton name='Zatwierdź' className='mt-2' />
      </div>
    </div>
  );
}

function SecurityComponent() {
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Security</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <BaseInput type='password' label='Password' name='password' placeholder='Your Password' />
        <BaseInput
          type='password'
          label='Confirm Password'
          name='confPassword'
          placeholder='Confirm Password'
        />
        <BaseButton name='Zatwierdź' className='mt-2' />
      </div>
    </div>
  );
}

function RoleComponent() {
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Role</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center'>
          Your current role:
          <span className='capitalize font-medium'>ADMIN</span>
        </div>
        {/* In future check if role of current user is USER give this information otherwise no  */}
        <span className='text-center italic text-lg'>
          If you want to become moderator, send your application via form in user help section.
        </span>
      </div>
    </div>
  );
}

function NotificiationsComponent() {
  return <div>Notificiations Content</div>;
}

function LanguageComponent() {
  return <div>Language Content</div>;
}

function PreferencesComponent() {
  return <div>Preferences Content</div>;
}

function UserMenuSettingsModal(props) {
  const [currentOption, setCurrentOption] = useState(null);

  const handleCurrentOption = (option) => {
    setCurrentOption(option);
  };

  let contentComponent;

  switch (currentOption) {
    case 'account':
      contentComponent = <AccountComponent />;
      break;
    case 'security':
      contentComponent = <SecurityComponent />;
      break;
    case 'role':
      contentComponent = <RoleComponent />;
      break;
    case 'notificiations':
      contentComponent = <NotificiationsComponent />;
      break;
    case 'language':
      contentComponent = <LanguageComponent />;
      break;
    case 'preferences':
      contentComponent = <PreferencesComponent />;
      break;
    default:
      contentComponent = <AccountComponent />;
      break;
  }

  return (
    <>
      <BaseModal closeModal={props.closeModal}>
        <div className='flex p-2'>
          <div className='w-2/6 text-xl flex flex-col gap-2 pr-4'>
            <div>General</div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'account' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'account' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('account')}
            >
              <img src='./assets/account_icon.svg' alt='account_icon' className='h-5 w-5' />
              Account
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'security' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'security' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('security')}
            >
              <img src='./assets/shield_lock_icon.svg' alt='shield_lock_icon' className='h-5 w-5' />
              Security
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'role' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'role' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('role')}
            >
              <img src='./assets/user_role_icon.svg' alt='user_role_icon' className='h-5 w-5' />
              Role
            </motion.div>
            <div>System</div>
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
              Notificiations
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'language' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'language' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('language')}
            >
              <img src='./assets/language_icon.svg' alt='preferences_icon' className='h-5 w-5' />
              Language
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 cursor-pointer text-lg pl-2 ${
                currentOption === 'preferences' ? 'bg-red-600' : ''
              }`}
              whileHover={{ scale: 1.1, color: currentOption === 'preferences' ? 'white' : 'red' }}
              onClick={() => handleCurrentOption('preferences')}
            >
              <img src='./assets/preferences_icon.svg' alt='preferences_icon' className='h-5 w-5' />
              Preferences
            </motion.div>
          </div>
          <div className='w-4/6 text-xl'>{contentComponent}</div>
        </div>
      </BaseModal>
    </>
  );
}

export default UserMenuSettingsModal;
