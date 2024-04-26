import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import BaseButton from '../../../Base/BaseButton';
import BaseInput from '../../../Base/BaseInput';
import { useTranslation } from 'react-i18next';
import UserIcon from '../../../icons/UserIcon';
import AccountIcon from '../../../icons/AccountIcon';

function AccountSettings() {
  const [isValidName, setIsValidName] = useState(null);
  const [isValidSurname, setIsValidSurname] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [cookies] = useCookies(['user']);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const { t } = useTranslation();

  const user = cookies.user;

  useEffect(() => {
    if (user) {
      if (nameRef.current) nameRef.current.value = user.username;
      if (surnameRef.current) surnameRef.current.value = user.username;
      if (emailRef.current) emailRef.current.value = user.email;
    }
  }, []);

  const handleBlurName = () => {
    const nameRegex = /^[A-Za-z]+$/;
    setIsValidName(nameRegex.test(nameRef.current.value));
  };

  const handleBlurSurnName = () => {
    const surnameRegex = /^[A-Za-z]+$/;
    setIsValidSurname(surnameRegex.test(surnameRef.current.value));
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const checkIsNotSameData = () => {
    if (
      user.username === nameRef.current.value &&
      user.username === surnameRef.current.value &&
      user.email === emailRef.current.value
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (checkIsNotSameData() === false) {
      {
        /*TODO HERE will be axios request to change data */
      }
      // console.log('account data changed!');
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
      <div className='flex gap-4 h-14 items-center my-4 mx-4'>
        <div className='relative'>
          {/*TODO In future on click possibility to change user avatar */}
          <motion.div whileHover={{ scale: 1.05 }} className='rounded-full p-1 cursor-pointer'>
            <UserIcon className='h-10 w-10' />
          </motion.div>
        </div>

        <div className='flex flex-col leading-5'>
          <span className='text-lg'>{user.username}</span>
          <span className='text-sm uppercase italic'>
            {user.admin ? t('user.admin') : t('user.user')}
          </span>
        </div>
      </div>
      <div className='border-textColor border-t-2 py-2 pt-4 gap-4 flex flex-col items-center'>
        <BaseInput
          type='text'
          placeholder={t('user.name')}
          name='nameInput'
          label={t('user.name')}
          ref={nameRef}
          onBlur={handleBlurName}
        ></BaseInput>
        {isValidName === false && <p className='text-red-500 text-xs'>{t('user.name_error')}</p>}
        <BaseInput
          type='text'
          placeholder={t('user.surname')}
          name='surnameInput'
          label={t('user.surname')}
          ref={surnameRef}
          onBlur={handleBlurSurnName}
        ></BaseInput>
        {isValidSurname === false && (
          <p className='text-red-500 text-xs'>{t('user.surname_error')}</p>
        )}
        <BaseInput
          type='text'
          placeholder='Email'
          name='emailInput'
          label='Email'
          ref={emailRef}
          onBlur={handleBlurEmail}
        ></BaseInput>
        {isValidEmail === false && <p className='text-red-500 text-xs'>{t('user.email_error')}</p>}
        {isValidName || isValidSurname || isValidEmail ? (
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
