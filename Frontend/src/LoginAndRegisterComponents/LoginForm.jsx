import { useState } from 'react';
import BaseInput from '../Base/BaseInput';
import { useTranslation } from 'react-i18next';
import ShowPassword from './ShowPassword';

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
        placeholder={t('log_reg_form.example_mail')}
        ref={emailRef}
        className={isValidEmail === false ? 'bg-red-300' : ''}
        onBlur={handleBlurEmail}
      />
      {isValidEmail === false && (
        <p className='text-red-500 text-xs'>{t('log_reg_form.mail_warning')}</p>
      )}
      <BaseInput
        type={!isVisible ? 'password' : 'text'}
        label={t('common.pass')}
        name='password'
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
      <ShowPassword isVisible={isVisible} handlePasswordVisability={handlePasswordVisability} />
    </div>
  );
};

export default LoginForm;
