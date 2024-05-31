import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import Loader from 'Components/Loader/Loader';
import CheckIcon from 'icons/CheckIcon';
import BaseInput from 'Components/Base/BaseInput';
import AlertIcon from 'icons/AlertIcon';

const PasswordResetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handlePasswordChange = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleConfirmPasswordChange = () => {
    setIsValidConfirmPassword(confirmPasswordRef.current.value === passwordRef.current.value);
  };

  // const handlePasswordReset = async () => {
  //   try {
  //     await axios.put(`http://localhost:8000/memo_places/reset_password/pk=${user.user_id}`);
  //     dispatch(notificationModalActions.changeType('alert'));
  //     dispatch(notificationModalActions.changeTitle(t('common.verify_account')));
  //     dispatch(notificationModalActions.changeIsNotificationModalOpen());
  //   } catch (error) {
  //     dispatch(notificationModalActions.changeType('error'));
  //     dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
  //     dispatch(notificationModalActions.changeIsNotificationModalOpen());
  //   }
  // };

  useEffect(() => {
    // decode id here

    axios
      .put(`http://localhost:8000/memo_places/user_verifi/${id}/`)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, []);

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='bg-mainBgColor text-textColor flex justify-center items-center w-screen h-screen font-sans'>
            <div className='flex flex-col items-center gap-6 -mt-20'>
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
                    // onClick={() => handlePasswordReset()}
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
              <p className='text-6xl mb-3'>{t('user.verification_info')}</p>
              <p className='text-2xl mb-2'>{t('user.verification_info2')}</p>
              <Link to='/' className='flex justify-center items-center'>
                <BaseButton name={t('user.go_to_mainpage')} className={'w-56'} btnBg='blue' />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordResetPage;
