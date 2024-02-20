import { useState } from 'react';
import BaseInput from '../Base/BaseInput';
import { useTranslation } from 'react-i18next';

const LoginAndRegister = ({
  isLogging,
  emailRef,
  passwordRef,
  confPasswordRef,
  usernameRef,
  isValidEmail,
  isValidPassword,
  isValidConfPassword,
  isValidUsername,
  handleBlurEmail,
  handleBlurPassword,
  handleBlurConfPassword,
  handleBlurUsername,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const responseFacebook = (response) => {
    console.log(response);
  };

  const handlePasswordVisability = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      {isLogging ? (
        <>
          <BaseInput
            type='text'
            label='Email'
            name='email'
            placeholder={t('log_reg_form.example_mail')}
            ref={emailRef}
            className={isValidEmail === false && 'bg-red-300'}
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
            className={isValidPassword === false && 'bg-red-300'}
          />
          {isValidPassword === false && (
            <ul role='list' className='text-red-500 text-xs'>
              {t('log_reg_form.pass_title')}
              <li>{t('log_reg_form.pass_info1')}</li>
              <li>{t('log_reg_form.pass_info2')}</li>
              <li>{t('log_reg_form.pass_info3')}</li>
            </ul>
          )}
        </>
      ) : (
        <>
          <BaseInput
            type='text'
            label={t('common.username')}
            name='Username'
            ref={usernameRef}
            onBlur={handleBlurUsername}
            className={isValidUsername === false && 'bg-red-300'}
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
            className={isValidEmail === false && 'bg-red-300'}
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
            className={isValidPassword === false && 'bg-red-300'}
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
            className={isValidConfPassword === false && 'bg-red-300'}
          />
          {isValidConfPassword === false && (
            <p className='text-red-500 text-xs'>{t('log_reg_form.pass_similar')}</p>
          )}
        </>
      )}
      <div className='flex'>
        {isVisible ? (
          <>
            {' '}
            <div className='flex cursor-pointer hover:scale-110' onClick={handlePasswordVisability}>
              <img
                src='./assets/eye_close_icon.svg'
                alt='eye_close_icon'
                className='h-6 w-6 cursor-pointer'
              />
              <span>{t('log_reg_form.hide_pass')}</span>
            </div>
          </>
        ) : (
          <>
            <div className='flex cursor-pointer hover:scale-110' onClick={handlePasswordVisability}>
              <img
                onClick={handlePasswordVisability}
                src='./assets/eye_open_icon.svg'
                alt='eye_open_icon'
                className='h-6 w-6 cursor-pointer'
              />
              <span>{t('log_reg_form.show_pass')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAndRegister;
