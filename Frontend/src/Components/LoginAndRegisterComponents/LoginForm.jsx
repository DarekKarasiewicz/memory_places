import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BaseInput from 'Components/Base/BaseInput';
import ShowPassword from './ShowPassword';
import AlertIcon from 'icons/AlertIcon';

const LoginForm = ({
  emailRef,
  passwordRef,
  isValidEmail,
  isValidPassword,
  handleBlurEmail,
  handleBlurPassword,
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
        label='Email'
        name='email'
        maxLength={255}
        placeholder={t('log_reg_form.example_mail')}
        ref={emailRef}
        className={isValidEmail === false ? 'bg-red-400' : ''}
        onBlur={handleBlurEmail}
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
        name='password'
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
      <ShowPassword isVisible={isVisible} handlePasswordVisability={handlePasswordVisability} />
    </div>
  );
};

export default LoginForm;
