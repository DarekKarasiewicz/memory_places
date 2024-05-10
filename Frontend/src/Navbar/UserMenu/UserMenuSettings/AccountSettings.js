import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import BaseButton from 'Base/BaseButton';
import BaseInput from 'Base/BaseInput';
import { useTranslation } from 'react-i18next';
import UserIcon from 'icons/UserIcon';
import AccountIcon from 'icons/AccountIcon';
import AlertIcon from 'icons/AlertIcon';
import { useDispatch } from 'react-redux';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

function AccountSettings() {
  const [isValidUsername, setIsValidUsername] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [cookies] = useCookies(['user']);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = cookies.user;

  useEffect(() => {
    if (user) {
      if (usernameRef.current) usernameRef.current.value = user.username;
      if (emailRef.current) emailRef.current.value = user.email;
    }
  }, []);

  const handleUserNameChange = () => {
    setIsValidUsername(usernameRef.current.value.length > 0);
  };

  const handleEmailChange = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const checkIsUsernameChanged = () => {
    const newUsername = usernameRef.current.value;
    if (user.username !== newUsername) {
      return newUsername;
    } else {
      return null;
    }
  };

  const checkIsEmailChanged = () => {
    const newEmail = emailRef.current.value;
    if (user.email !== newEmail) {
      return newEmail;
    } else {
      return null;
    }
  };

  const checkIsDataChanged = () => {
    return checkIsEmailChanged() !== null || checkIsUsernameChanged() !== null;
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (checkIsDataChanged()) {
      const changedEmail = checkIsEmailChanged();
      const changedUsername = checkIsUsernameChanged();

      const newData = {};
      if (changedEmail !== null) {
        newData.email = changedEmail;
      }
      if (changedUsername !== null) {
        newData.username = changedUsername;
      }

      axios
        .put(`http://localhost:8000/memo_places/users/pk=${user.user_id}/`, newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
          //TO DO
          //When refresh token function will be avaiable add it here + when eamil will be changed send verification mail
          dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
          dispatch(confirmationModalActions.changeType('success'));
        })
        .catch(() => {
          dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
          dispatch(confirmationModalActions.changeType('error'));
        });
    }
  };

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

  return (
    <motion.div variants={parentItem} initial='hidden' animate='visible'>
      <div className='border-b-2 border-textColor pr-2 pb-2 pl-2 text-2xl flex gap-2'>
        <AccountIcon />
        <span>{t('user.account')}</span>
      </div>
      <div className='flex flex-col justify-center gap-2 my-4 items-center'>
        <div className='relative'>
          {/*TODO In future on click possibility to change user avatar */}
          <motion.div whileHover={{ scale: 1.05 }} className='rounded-full p-1 cursor-pointer'>
            <UserIcon className='h-10 w-10' />
          </motion.div>
        </div>
        <div className='flex flex-col justify-center items-center leading-5'>
          <span className='text-xl'>{user.username}</span>
          <span className='text-lg normal-case'>
            Account type: {user.admin ? t('user.admin') : t('user.user')}
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 px-4'>
        <div className='w-full flex flex-col gap-2'>
          <BaseInput
            type='text'
            placeholder={t('common.username')}
            name='nameInput'
            label={t('common.username')}
            isValid={isValidUsername}
            ref={usernameRef}
            onBlur={handleUserNameChange}
            onChange={handleUserNameChange}
          />
          {isValidUsername === false && (
            <span className='text-red-500 flex items-center gap-2'>
              <AlertIcon className='h-6 w-6' color='#ef4444' />
              <p className='text-base'>{t('user.name_error')}</p>
            </span>
          )}
        </div>
        <div className='w-full flex flex-col gap-2'>
          <BaseInput
            type='text'
            placeholder='Email'
            name='emailInput'
            label='Email'
            isValid={isValidEmail}
            ref={emailRef}
            onBlur={handleEmailChange}
            onChange={handleEmailChange}
          />
          {isValidEmail === false && (
            <span className='text-red-500 flex items-center gap-2'>
              <AlertIcon className='h-6 w-6' color='#ef4444' />
              <p className='text-base'>{t('user.email_error')}</p>
            </span>
          )}
        </div>
        {isValidUsername || isValidEmail ? (
          <BaseButton
            name={t('user.confirm')}
            className='mt-4'
            btnBg='blue'
            onClick={handleSumbit}
          />
        ) : (
          <BaseButton
            name={t('user.confirm')}
            className='mt-4 cursor-not-allowed'
            btnBg='blue'
            disabled={true}
          />
        )}
      </div>
    </motion.div>
  );
}

export default AccountSettings;
