import { useState, useRef } from 'react';
import BaseModal from '../Base/BaseModal';
import LoginAndRegister from '../LoginAndRegisterComponents/LoginAndRegister';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';

const LoginAndRegisterModal = (props) => {
  const [title, setTitle] = useState('Sign In');
  const [isLogging, setIsLogging] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfPassword, setIsValidConfPassword] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);

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
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleBlurConfPassword = () => {
    setIsValidConfPassword(confPasswordRef.current.value === passwordRef.current.value);
  };

  const handleBlurUsername = () => {
    setIsUsernameValid(usernameRef.current.value.length > 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogging) {
      if (isValidEmail && isValidPassword) {
        const user = {
          email: emailRef.current.value.toLowerCase(),
          password: passwordRef.current.value,
        };
        axios
          .post('http://localhost:8000/memo_places/token/', {
            email: `${user.email}`,
            password: `${user.password}`,
          })
          .then((response) => {
            const decoded = jwtDecode(response.data.access);
            setCookie('user', decoded);
            console.log(decoded);
          });
        dispatch(modalsActions.changeIsLoginAndRegisterOpen());
      } else {
        alert('Check your Inputs, Something is wrong!');
      }
    } else {
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
          .then((response) => {
            //Co tu jest zwracane?
            alert('You need to verify your account to Sing in!');
            setIsLogging(true);
          });
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
          usernameRef={usernameRef}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          isValidConfPassword={isValidConfPassword}
          isValidUsername={isUsernameValid}
          handleBlurEmail={handleBlurEmail}
          handleBlurPassword={handleBlurPassword}
          handleBlurConfPassword={handleBlurConfPassword}
          handleBlurUsername={handleBlurUsername}
        />
        <div>-------- or use --------</div>
        <GoogleLogin
          shape='pill'
          onSuccess={(credentialResponse) => {
            let done; 
            let decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded.email.replace(/\./g,"%26"))
            axios.get(`http://localhost:8000/memo_places/users/email%3D${decoded.email.replace(/\./g,"&")}`, {
              headers: { 'Content-Type': 'application/json' },
          }).then(response => { 
              decoded = { ...decoded, id: response.id }
              setCookie('user', decoded);
              console.log(decoded);
          }).catch(error => {
            console.log(error)
              if (error.response.status === 404) {
                  axios.post(
                      'http://localhost:8000/memo_places/outside_users/',
                      {
                          email: decoded.email,
                          username: decoded.name
                      },
                      {
                          headers: {
                              'Content-Type': 'application/json'
                          }
                      }
                  ).then(response => {
                      // Handle successful response
                      console.log(response.data);
                      decoded = { ...decoded, id: response.data.id };
                      setCookie('user', decoded);
                  }).catch(error => {
                      // Handle error
                      console.error('Error:', error);
                  });
              } else {
                  // Handle other errors from GET request
                  console.error('Error:', error);
              }
          });
              console.log(done)
            setCookie('user', decoded);
            console.log(decoded);
          }}
          onError={() => {
            alert('Login Failed');
          }}
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
