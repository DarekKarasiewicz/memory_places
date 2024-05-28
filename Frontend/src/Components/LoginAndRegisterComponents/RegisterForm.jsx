import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import BaseInput from 'Components/Base/BaseInput';
import ShowPassword from './ShowPassword';
import AlertIcon from 'icons/AlertIcon';

const RegisterForm = ({
  usernameRef,
  emailRef,
  passwordRef,
  confPasswordRef,
  isValidUsername,
  isValidEmail,
  isValidPassword,
  isValidConfPassword,
  handleBlurUsername,
  handleBlurEmail,
  handleBlurPassword,
  handleBlurConfPassword,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const handlePasswordVisability = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='flex flex-col gap-2'>
      <BaseInput
        type='text'
        label={t('common.username')}
        name='Username'
        ref={usernameRef}
        onBlur={handleBlurUsername}
        className={isValidUsername === false ? 'bg-red-400' : ''}
      />
      {isValidUsername === false && (
        <div className='flex items-center gap-2'>
          <AlertIcon className='h-6 w-6' color='#ef4444' />
          <p className='text-red-500 text-base'>{t('log_reg_form.field_info')}</p>
        </div>
      )}
      <BaseInput
        type='text'
        label='Email'
        name='email'
        placeholder={t('log_reg_form.example_mail')}
        ref={emailRef}
        onBlur={handleBlurEmail}
        className={isValidEmail === false ? 'bg-red-400' : ''}
      />
      {isValidEmail === false && (
        <div className='flex items-center gap-2'>
          <AlertIcon className='h-6 w-6' color='#ef4444' />
          <p className='text-red-500 text-base'>{t('log_reg_form.mail_warning')}</p>
        </div>
      )}
      <BaseInput
        type={!isVisible ? 'password' : 'text'}
        label={t('common.pass')}
        name='Password'
        placeholder={t('log_reg_form.your_password')}
        ref={passwordRef}
        onBlur={handleBlurPassword}
        className={isValidPassword === false ? 'bg-red-400' : ''}
      />
      {isValidPassword === false && (
        <div className='text-red-500 flex items-start gap-2'>
          <AlertIcon className='h-6 w-6' color='#ef4444' />
          <div>
            <span className='text-base'>{t('log_reg_form.pass_title')}</span>
            <ul className='text-red-500 text-xs leading-5 list-disc ml-5'>
              <li>{t('log_reg_form.pass_info1')}</li>
              <li>{t('log_reg_form.pass_info2')}</li>
              <li>{t('log_reg_form.pass_info3')}</li>
            </ul>
          </div>
        </div>
      )}
      <BaseInput
        type={!isVisible ? 'password' : 'text'}
        label={t('log_reg_form.confirm_pass')}
        name='confPassword'
        placeholder={t('log_reg_form.confirm_pass')}
        ref={confPasswordRef}
        onBlur={handleBlurConfPassword}
        className={isValidConfPassword === false ? 'bg-red-400' : ''}
      />
      {isValidConfPassword === false && (
        <div className='flex items-center gap-2'>
          <AlertIcon className='h-6 w-6' color='#ef4444' />
          <p className='text-red-500 text-base'>{t('log_reg_form.pass_similar')}</p>
        </div>
      )}
      <ShowPassword isVisible={isVisible} handlePasswordVisability={handlePasswordVisability} />
    </div>
  );
};

export default RegisterForm;
