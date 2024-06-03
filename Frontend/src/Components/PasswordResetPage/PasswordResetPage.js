import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import CheckIcon from 'icons/CheckIcon';
import BaseInput from 'Components/Base/BaseInput';
import AlertIcon from 'icons/AlertIcon';
import App from 'App';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const PasswordResetPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { fontSize } = useFontSize();

  const handlePasswordChange = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleConfirmPasswordChange = () => {
    setIsValidConfirmPassword(confirmPasswordRef.current.value === passwordRef.current.value);
  };

  const handlePasswordReset = async () => {
    if (isValidPassword && isValidConfirmPassword) {
      try {
        await axios.put(`http://localhost:8000/memo_places/reset_password/pk=${id}/`, {
          password: passwordRef.current.value,
        });
        setIsSuccess(true);
      } catch (error) {
        setIsSuccess(false);
        dispatch(notificationModalActions.changeType('error'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      }
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.check_inputs')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  return (
    <App>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='bg-mainBgColor text-textColor flex justify-center items-center w-screen h-screen font-sans'>
          <div className={`flex flex-col items-center gap-6 ${!isSuccess ? 'w-1/4' : ''}`}>
            {!isSuccess ? (
              <div className='flex flex-col items-center gap-4 p-4'>
                <p className={`text-${fontSize}-4xl mb-3 text-center`}>
                  {t('user.reset_pass_title')}
                </p>
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
                        <span className={`text-${fontSize}-lg`}>
                          {t('log_reg_form.pass_title')}
                        </span>
                        <ul
                          className={`text-red-500 text-${fontSize}-base leading-5 list-disc ml-5`}
                        >
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
                      <p className={`text-${fontSize}-lg`}>{t('log_reg_form.pass_similar')}</p>
                    </span>
                  )}
                </div>
                {isValidPassword && isValidConfirmPassword ? (
                  <BaseButton
                    name={t('common.confirm')}
                    className='mt-4'
                    btnBg='blue'
                    onClick={handlePasswordReset}
                  />
                ) : (
                  <BaseButton
                    name={t('common.confirm')}
                    className='mt-4 cursor-not-allowed'
                    btnBg='blue'
                    disabled={true}
                  />
                )}
                <Link to='/' className='flex justify-center items-center'>
                  <BaseButton name={t('user.go_to_mainpage')} className={'w-56'} btnBg='blue' />
                </Link>
              </div>
            ) : (
              <div className='flex flex-col items-center text-center gap-6'>
                <CheckIcon className='w-40' />
                <p className='text-6xl mb-3'>{t('common.pass_changed_success')}</p>
                <Link to='/' className='flex justify-center items-center'>
                  <BaseButton name={t('user.go_to_mainpage')} className={'w-56'} btnBg='blue' />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </App>
  );
};

export default PasswordResetPage;
