import { useState } from 'react';
import BaseInput from '../Base/BaseInput';

const LoginAndRegister = ({
  isLogging,
  emailRef,
  passwordRef,
  confPasswordRef,
  isValidEmail,
  isValidPassword,
  isValidConfPassword,
  handleBlurEmail,
  handleBlurPassword,
  handleBlurConfPassword,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
            placeholder='Your Email'
            ref={emailRef}
            className={isValidEmail === false && 'bg-red-300'}
            onBlur={handleBlurEmail}
          />
          {isValidEmail === false && <p className='text-red-500 text-xs'>Email is incorrect!</p>}
          <BaseInput
            type={!isVisible ? 'password' : 'text'}
            label='Password'
            name='password'
            placeholder='Your Password'
            ref={passwordRef}
            onBlur={handleBlurPassword}
            className={isValidPassword === false && 'bg-red-300'}
          />
          {isValidPassword === false && (
            <ul role='list' className='text-red-500 text-xs'>
              Password must:
              <li>Be at least 8 characters long.</li>
              <li>Contains at least one digit.</li>
              <li>Contains at least one special character.</li>
            </ul>
          )}
        </>
      ) : (
        <>
          <BaseInput
            type='text'
            label='Email'
            name='email'
            placeholder='Your Email'
            ref={emailRef}
            onBlur={handleBlurEmail}
            className={isValidEmail === false && 'bg-red-300'}
          />
          {isValidEmail === false && <p className='text-red-500 text-xs'>Email is incorrect!</p>}
          <BaseInput
            type={!isVisible ? 'password' : 'text'}
            label='Password'
            name='password'
            placeholder='Your Password'
            ref={passwordRef}
            onBlur={handleBlurPassword}
            className={isValidPassword === false && 'bg-red-300'}
          />
          {isValidPassword === false && (
            <ul role='list' className='text-red-500 text-xs'>
              Password must:
              <li>Be at least 8 characters long.</li>
              <li>Contains at least one digit.</li>
            </ul>
          )}
          <BaseInput
            type={!isVisible ? 'password' : 'text'}
            label='Confirm Password'
            name='confPassword'
            placeholder='Confirm Password'
            ref={confPasswordRef}
            onBlur={handleBlurConfPassword}
            className={isValidConfPassword === false && 'bg-red-300'}
          />
          {isValidConfPassword === false && (
            <p className='text-red-500 text-xs'>Password must be similar</p>
          )}
        </>
      )}
      <div className='flex'>
        {isVisible ? (
          <>
            {' '}
            <img
              onClick={handlePasswordVisability}
              src='./assets/eye_close_icon.svg'
              alt='eye_close_icon'
              className='h-6 w-6 cursor-pointer'
            />
            <span>Hide password</span>
          </>
        ) : (
          <>
            <img
              onClick={handlePasswordVisability}
              src='./assets/eye_open_icon.svg'
              alt='eye_open_icon'
              className='h-6 w-6 cursor-pointer'
            />
            <span>Show password</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAndRegister;
