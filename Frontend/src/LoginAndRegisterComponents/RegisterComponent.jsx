import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const RegisterComponent = ({ setIsLogging }) => {
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfPassword, setIsValidConfPassword] = useState(null);
  const [isValidUsername, setIsValidUsername] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const { t } = useTranslation();

  const handleBlurConfPassword = () => {
    setIsValidConfPassword(confPasswordRef.current.value === passwordRef.current.value);
  };

  const handleBlurUsername = () => {
    setIsValidUsername(usernameRef.current.value.length > 0);
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const handleBlurPassword = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidEmail && isValidPassword && isValidConfPassword) {
      const newUser = {
        email: emailRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
        username: usernameRef.current.value,
      };

      axios
        .post(`http://localhost:8000/memo_places/users/`, newUser, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
          alert(t('common.verify_account'));
          setIsLogging(true);
        });
    } else {
      alert(t('common.check_inputs'));
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <RegisterForm
        usernameRef={usernameRef}
        emailRef={emailRef}
        passwordRef={passwordRef}
        confPasswordRef={confPasswordRef}
        isValidUsername={isValidUsername}
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
        isValidConfPassword={isValidConfPassword}
        handleBlurUsername={handleBlurUsername}
        handleBlurEmail={handleBlurEmail}
        handleBlurPassword={handleBlurPassword}
        handleBlurConfPassword={handleBlurConfPassword}
      />
      <BaseButton
        type='submit'
        name={t('common.sign_up')}
        btnBg='blue'
        className='mt-5 mb-5'
        onClick={handleSubmit}
      />
    </div>
  );
};

export default RegisterComponent;
