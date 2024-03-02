import { useState, useRef, useEffect } from 'react';
import BaseModal from '../Base/BaseModal';
import LoginAndRegister from '../LoginAndRegisterComponents/LoginAndRegister';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import useAuth from '../Hooks/useAuth';

const LoginAndRegisterModal = (props) => {
  const [title, setTitle] = useState();
  const [isLogging, setIsLogging] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfPassword, setIsValidConfPassword] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  const { t } = useTranslation();
  const { setUserCredentials } = useAuth();

  useEffect(() => {
    setTitle(t('common.sign_in'));
  }, []);

  const handleIsLogging = () => {
    setIsLogging(!isLogging);
    if (isLogging) {
      setTitle(t('common.sign_up'));
    } else {
      setTitle(t('common.sign_in'));
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
          .post(
            'http://localhost:8000/memo_places/token/',
            {
              email: `${user.email}`,
              password: `${user.password}`,
            },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then((response) => {
            const decoded = jwtDecode(response.data.access);
            console.log(decoded);
            // setCookie(
            //   'user',
            //   {
            //     admin: decoded.admin,
            //     master: decoded.master,
            //     user_id: decoded.user_id,
            //     email: decoded.email,
            //     username: decoded.username,
            //   },
            //   { expires: new Date(decoded.exp * 1000) },
            // );
            //set as HTTPOnly and secure
            setUserCredentials({
              user: { user_id: decoded.user_id, username: decoded.username, email: decoded.email },
              isAdmin: decoded.admin,
              isMaster: decoded.master,
              accessToken: decoded.jti,
            });
            dispatch(modalsActions.changeIsLoginAndRegisterOpen());
          })
          .catch((error) => {
            if (!error.response) {
              setErrorMsg('No Server Response');
            } else if (error.response.status === 401) {
              setErrorMsg('Unauthorized');
            } else {
              setErrorMsg('Login Failed');
            }
          });
      } else {
        alert(t('common.check_inputs'));
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
            alert(t('common.verify_account'));
            setIsLogging(true);
          });
      } else {
        alert(t('common.check_inputs'));
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
        <div className='my-2'>{t('common.or')}</div>
        <GoogleLogin
          shape='pill'
          onSuccess={(credentialResponse) => {
            let decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded.email.replace(/\./g, '%26'));
            axios
              .get(
                `http://localhost:8000/memo_places/users/email%3D${decoded.email.replace(
                  /\./g,
                  '&',
                )}`,
                {
                  headers: { 'Content-Type': 'application/json' },
                },
              )
              .then((response) => {
                decoded = { ...decoded, id: response.id };
                setCookie('user', decoded);
                // console.log(decoded);
              })
              .catch((error) => {
                console.log(error);
                if (error.response.status === 404) {
                  axios
                    .post(
                      'http://localhost:8000/memo_places/outside_users/',
                      {
                        email: decoded.email,
                        username: decoded.name,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    )
                    .then((response) => {
                      // Handle successful response
                      // console.log(response.data);
                      decoded = { ...decoded, id: response.data.id };
                      setCookie('user', decoded);
                    })
                    .catch((error) => {
                      // Handle error
                      // console.error('Error:', error);
                    });
                } else {
                  // Handle other errors from GET request
                  // console.error('Error:', error);
                }
              });
            setCookie('user', decoded);
            // console.log(decoded);
          }}
          onError={() => {
            alert(t('common.login_error'));
          }}
        />
        <BaseButton
          type='submit'
          name={isLogging ? t('common.sign_in') : t('common.sign_up')}
          className='mt-5 mb-5'
          btnBg='blue'
          onClick={handleSubmit}
        />
        {isLogging ? (
          <p>
            {t('common.question_account')}{' '}
            <span
              onClick={handleIsLogging}
              className='cursor-pointer text-blue-400 hover:text-blue-600 hover:underline'
            >
              {t('common.create_account')}
            </span>
          </p>
        ) : (
          <p
            onClick={handleIsLogging}
            className='cursor-pointer text-blue-400 hover:text-blue-600 hover:underline'
          >
            {t('common.sign_account')}
          </p>
        )}
      </div>
    </BaseModal>
  );
};

export default LoginAndRegisterModal;
