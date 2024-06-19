import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import BaseInput from 'Components/Base/BaseInput';
import UserIcon from 'icons/UserIcon';
import AccountIcon from 'icons/AccountIcon';
import AlertIcon from 'icons/AlertIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';
import { jwtDecode } from 'jwt-decode';

function AccountSettings() {
  const [isValidUsername, setIsValidUsername] = useState(null);
  const [cookies, setCookie] = useCookies(['user']);
  const usernameRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = cookies.user;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  useEffect(() => {
    if (user) {
      if (usernameRef.current) usernameRef.current.value = user.username;
    }
  }, []);

  const handleUserNameChange = () => {
    setIsValidUsername(usernameRef.current.value.length > 0);
  };

  const checkIsUsernameChanged = () => {
    const newUsername = usernameRef.current.value;
    if (user.username !== newUsername) {
      return newUsername;
    } else {
      return null;
    }
  };

  const checkIsDataChanged = () => {
    return checkIsUsernameChanged() !== null;
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (checkIsDataChanged()) {
      const changedUsername = checkIsUsernameChanged();

      const newData = {};
      if (changedUsername !== null) {
        newData.username = changedUsername;
      }

      axios
        .put(`${appPath}/memo_places/users/${user.user_id}/`, newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          const decodedData = jwtDecode(response.data);

          setCookie(
            'user',
            {
              ...user,
              user_id: decodedData.user_id,
              username: decodedData.username,
              email: decodedData.email,
              admin: decodedData.admin,
              master: decodedData.master,
              refreshToken: response.data.refresh,
              accessToken: response.data.access,
            },
            {
              expires: new Date(decodedData.exp * 1000),
              path: '/',
            },
          );

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
      <div className='flex items-center gap-2 border-b-2 border-textColor px-2 pb-2'>
        <AccountIcon />
        <span className={`text-${fontSize}-2xl`}>{t('user.account')}</span>
      </div>
      <div className='flex flex-col justify-center gap-2 my-4 items-center'>
        <div className='relative'>
          {/*TODO In future on click possibility to change user avatar */}
          <motion.div whileHover={{ scale: 1.05 }} className='rounded-full p-1 cursor-pointer'>
            <UserIcon className='h-10 w-10' />
          </motion.div>
        </div>
        <div className='flex flex-col justify-center items-center leading-5'>
          <span className={`text-${fontSize}-xl`}>{user.username}</span>
          <span className={`text-${fontSize}-lg normal-case`}>
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
            maxLength={32}
            isValid={isValidUsername}
            ref={usernameRef}
            onBlur={handleUserNameChange}
            onChange={handleUserNameChange}
          />
          {isValidUsername === false && (
            <span className='text-red-500 flex items-center gap-2'>
              <AlertIcon className='h-6 w-6' color='#ef4444' />
              <p className={`text-${fontSize}-base`}>{t('user.name_error')}</p>
            </span>
          )}
        </div>
        {isValidUsername ? (
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
