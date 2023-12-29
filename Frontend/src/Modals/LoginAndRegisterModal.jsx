import { useState, useRef } from 'react';
import BaseModal from '../Base/BaseModal';
import LoginAndRegister from '../LoginAndRegisterComponents/LoginAndRegister';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';
import { jwtDecode } from "jwt-decode";

const LoginAndRegisterModal = (props) => {
  const [title, setTitle] = useState('Sign In');
  const [isLogging, setIsLogging] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfPassword, setIsValidConfPassword] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const dispatch = useDispatch();

  const handleIsLogging = () => {
    setIsLogging(!isLogging);
    if (title === 'Sign In') {
      setTitle('Sign Up');
    } else {
      setTitle('Sign In');
    }
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const handleBlurPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleBlurConfPassword = () => {
    setIsValidConfPassword(confPasswordRef.current.value === passwordRef.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogging) {
      if (isValidEmail && isValidPassword) {
        const user = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
        axios.post('http://localhost:8000/memo_places/token/', {
          email: `${user.email}`,
          password: `${user.password}`
        })
        .then(function (data) {
          // console.log(data);
          const decoded = jwtDecode(data.data.access);
          console.log(decoded);
        })
        dispatch(modalsActions.changeIsLoginAndRegisterOpen());
      } else {
        alert('Check your Inputs, Something is wrong!');
      }
    } else {
      if (isValidEmail && isValidPassword && isValidConfPassword) {
        const newUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          /*There must be more stuff like phone fb_link etc.*/
          /*Add fields after check link the same as this in axios.*/
        };

        axios.post(`http://localhost:8000/memo_places/users/`, { newUser }) 
      } else {
        alert('Check your Inputs, Something is wrong!');
      }
    }
  };

  return (
    <BaseModal title={title} closeModal={props.closeModal}>
      <div className='flex flex-col p-2 items-center'>
        <LoginAndRegister
          isLogging={isLogging}
          emailRef={emailRef}
          passwordRef={passwordRef}
          confPasswordRef={confPasswordRef}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          isValidConfPassword={isValidConfPassword}
          handleBlurEmail={handleBlurEmail}
          handleBlurPassword={handleBlurPassword}
          handleBlurConfPassword={handleBlurConfPassword}
        />
        <BaseButton
          type='submit'
          name={isLogging ? 'Sign in' : 'Sign up'}
          className='mt-5 mb-5'
          onClick={handleSubmit}
        />
        {isLogging ? (
          <p>
            Don&apos;t have account yet?{' '}
            <span
              onClick={handleIsLogging}
              className='cursor-pointer text-blue-400 hover:text-blue-600 hover:underline'
            >
              Just create one!
            </span>
          </p>
        ) : (
          <p
            onClick={handleIsLogging}
            className='cursor-pointer text-blue-400 hover:text-blue-600 hover:underline'
          >
            Sign in to your account!
          </p>
        )}
      </div>
    </BaseModal>
  );
};

export default LoginAndRegisterModal;
