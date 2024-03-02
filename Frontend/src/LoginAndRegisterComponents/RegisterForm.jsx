import BaseInput from '../Base/BaseInput';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ShowPassword from './ShowPassword';

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
    <div className='flex flex-col'>
      <BaseInput
        type='text'
        label={t('common.username')}
        name='Username'
        ref={usernameRef}
        onBlur={handleBlurUsername}
        className={isValidUsername === false ? 'bg-red-300' : ''}
      />
      {isValidUsername === false && (
        <p className='text-red-500 text-xs'>{t('log_reg_form.field_info')}</p>
      )}
      <BaseInput
        type='text'
        label='Email'
        name='email'
        placeholder={t('log_reg_form.example_mail')}
        ref={emailRef}
        onBlur={handleBlurEmail}
        className={isValidEmail === false ? 'bg-red-300' : ''}
      />
      {isValidEmail === false && (
        <p className='text-red-500 text-xs'>{t('log_reg_form.mail_warning')}</p>
      )}
      <BaseInput
        type={!isVisible ? 'password' : 'text'}
        label={t('common.pass')}
        name='Password'
        placeholder={t('log_reg_form.your_password')}
        ref={passwordRef}
        onBlur={handleBlurPassword}
        className={isValidPassword === false ? 'bg-red-300' : ''}
      />
      {isValidPassword === false && (
        <ul role='list' className='text-red-500 text-xs'>
          {t('log_reg_form.pass_title')}
          <li>{t('log_reg_form.pass_info1')}</li>
          <li>{t('log_reg_form.pass_info2')}</li>
          <li>{t('log_reg_form.pass_info3')}</li>
        </ul>
      )}
      <BaseInput
        type={!isVisible ? 'password' : 'text'}
        label={t('log_reg_form.confirm_pass')}
        name='confPassword'
        placeholder={t('log_reg_form.confirm_pass')}
        ref={confPasswordRef}
        onBlur={handleBlurConfPassword}
        className={isValidConfPassword === false ? 'bg-red-300' : ''}
      />
      {isValidConfPassword === false && (
        <p className='text-red-500 text-xs'>{t('log_reg_form.pass_similar')}</p>
      )}
      <ShowPassword isVisible={isVisible} handlePasswordVisability={handlePasswordVisability} />
    </div>
  );
};

export default RegisterForm;
