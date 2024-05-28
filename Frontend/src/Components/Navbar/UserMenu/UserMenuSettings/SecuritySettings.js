import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import BaseInput from 'Components/Base/BaseInput';
import ShieldLockIcon from 'icons/ShieldLockIcon';
import AlertIcon from 'icons/AlertIcon';

function SecuritySettings() {
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { t } = useTranslation();

  const handlePasswordChange = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleConfirmPasswordChange = () => {
    setIsValidConfirmPassword(confirmPasswordRef.current.value === passwordRef.current.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (isValidPassword && isValidConfirmPassword) {
      const newData = { password: passwordRef.current.value };
      // axios
      //   .put(`http://localhost:8000/memo_places/users/pk=${user.user_id}/`, newData, {
      //     headers: { 'Content-Type': 'application/json' },
      //   })
      //   .then(() => {
      //     //TO DO
      //     //When refresh token function will be avaiable add it here + when eamil will be changed send verification mail
      //     dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
      //     dispatch(confirmationModalActions.changeType('success'));
      //   })
      //   .catch(() => {
      //     dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
      //     dispatch(confirmationModalActions.changeType('error'));
      //   });
    }
    // Before axios request should check if password is not the same as previous one
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
        <ShieldLockIcon />
        <span>{t('user.security')}</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-4 px-4'>
        <div className='w-full flex flex-col gap-2'>
          <BaseInput
            type='password'
            label={t('common.pass')}
            name='password'
            placeholder={t('log_reg_form.your_password')}
            isValid={isValidPassword}
            ref={passwordRef}
            onBlur={handlePasswordChange}
            onChange={handlePasswordChange}
          />
          {isValidPassword === false && (
            <div className='text-red-500 flex items-start gap-2'>
              <AlertIcon className='h-6 w-6 my-1' color='#ef4444' />
              <div>
                <span className='text-lg'>{t('log_reg_form.pass_title')}</span>
                <ul className='text-red-500 text-base leading-5 list-disc ml-5'>
                  <li>{t('log_reg_form.pass_info1')}</li>
                  <li>{t('log_reg_form.pass_info2')}</li>
                  <li>{t('log_reg_form.pass_info3')}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='w-full flex flex-col gap-2'>
          <BaseInput
            type='password'
            label={t('log_reg_form.confirm_pass')}
            name='confPassword'
            placeholder={t('log_reg_form.confirm_pass')}
            isValid={isValidConfirmPassword}
            ref={confirmPasswordRef}
            onBlur={handleConfirmPasswordChange}
            onChange={handleConfirmPasswordChange}
          />
          {isValidConfirmPassword === false && (
            <span className='text-red-500 flex items-center gap-2'>
              <AlertIcon className='h-6 w-6' color='#ef4444' />
              <p className='text-lg'>{t('log_reg_form.pass_similar')}</p>
            </span>
          )}
        </div>
        {isValidPassword && isValidConfirmPassword ? (
          <BaseButton
            name={t('common.confirm')}
            className='mt-4'
            btnBg='blue'
            onClick={handleSumbit}
          />
        ) : (
          <BaseButton
            name={t('common.confirm')}
            className='mt-4 cursor-not-allowed'
            btnBg='blue'
            disabled={true}
          />
        )}
      </div>
    </motion.div>
  );
}

export default SecuritySettings;
