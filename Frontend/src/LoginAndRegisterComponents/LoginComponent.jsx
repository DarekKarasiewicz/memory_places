import { useState, useRef } from 'react';
import LoginForm from './LoginForm';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import BaseButton from 'Base/BaseButton';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { modalsActions } from 'Redux/modalsSlice';
import { useDispatch } from 'react-redux';
import useAuth from 'Hooks/useAuth';
import useRefreshToken from 'Hooks/useRefreshToken';
import { notificationModalActions } from 'Redux/notificationModalSlice';

const LoginComponent = () => {
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { setUserCredentials } = useAuth();
  const [cookies, setCookie] = useCookies(['user']);
  const { t } = useTranslation();
  const refresh = useRefreshToken();

  const responseFacebook = (response) => {
    //console.log(response);
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
          const refreshDecoded = jwtDecode(response.data.refresh);
          setCookie(
            'user',
            {
              user_id: refreshDecoded.user_id,
              username: refreshDecoded.username,
              email: refreshDecoded.email,
              admin: refreshDecoded.admin,
              master: refreshDecoded.master,
              refreshToken: refreshDecoded.jti,
            },
            {
              expires: new Date(refreshDecoded.exp * 1000),
            },
          );
          dispatch(modalsActions.changeIsLoginAndRegisterOpen());
        })
        .catch((error) => {
          if (!error.response) {
            dispatch(notificationModalActions.changeType('alert'));
            dispatch(notificationModalActions.changeTitle(t('common.no_response')));
          } else {
            dispatch(notificationModalActions.changeType('alert'));
            dispatch(notificationModalActions.changeTitle(t('common.login_error')));
          }
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        });
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.check_inputs')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  return (
    <div className='flex flex-col items-center gap-2 w-3/4'>
      <LoginForm
        emailRef={emailRef}
        passwordRef={passwordRef}
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
        handleBlurEmail={handleBlurEmail}
        handleBlurPassword={handleBlurPassword}
      />
      <div className='my-2'>{t('common.or')}</div>
      <GoogleLogin
        shape='pill'
        onSuccess={(credentialResponse) => {
          let decoded = jwtDecode(credentialResponse.credential);
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
            })
            .catch((error) => {
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
                    decoded = { ...decoded, id: response.data.id };
                    setCookie('user', decoded);
                  })
                  .catch((error) => {
                    dispatch(notificationModalActions.changeType('alert'));
                    dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
                    dispatch(notificationModalActions.changeIsNotificationModalOpen());
                  });
              } else {
                // Handle other errors from GET request
              }
            });
          setCookie('user', decoded);
        }}
        onError={() => {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('common.login_error')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        }}
      />

      <BaseButton
        type='submit'
        name={t('common.sign_in')}
        className='mt-5 mb-5'
        btnBg='blue'
        onClick={handleSubmit}
      />
    </div>
  );
};

export default LoginComponent;
