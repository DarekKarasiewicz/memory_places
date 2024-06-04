import { useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { modalsActions } from 'Redux/modalsSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { globalDataActions } from 'Redux/globalDataSlice';

import LoginForm from './LoginForm';
import BaseButton from 'Components/Base/BaseButton';
import axios from 'axios';

import useAuth from 'Hooks/useAuth';
import useRefreshToken from 'Hooks/useRefreshToken';

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
          location.reload();
        })
        .catch((error) => {
          if (!error.response) {
            dispatch(notificationModalActions.changeType('alert'));
            dispatch(notificationModalActions.changeTitle(t('common.no_response')));
          } else {
            dispatch(notificationModalActions.changeType('alert'));
            dispatch(notificationModalActions.changeTitle(t('common.login_error')));
          }
          dispatch(globalDataActions.changeBlockWrapperRef(true));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        });
    } else {
      dispatch(globalDataActions.changeBlockWrapperRef(true));
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
              const userDecoded = jwtDecode(response.data);
              setCookie(
                'user',
                {
                  user_id: userDecoded.user_id,
                  username: userDecoded.username,
                  email: userDecoded.email,
                  admin: userDecoded.admin,
                  master: userDecoded.master,
                  refreshToken: userDecoded.jti,
                },
                {
                  expires: new Date(userDecoded.exp * 1000),
                },
              );
              dispatch(modalsActions.changeIsLoginAndRegisterOpen());
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
                  .then((secondResponse) => {
                    const userDecoded = jwtDecode(secondResponse.data);
                    setCookie(
                      'user',
                      {
                        user_id: userDecoded.user_id,
                        username: userDecoded.username,
                        email: userDecoded.email,
                        admin: userDecoded.admin,
                        master: userDecoded.master,
                        refreshToken: userDecoded.jti,
                      },
                      {
                        expires: new Date(userDecoded.exp * 1000),
                      },
                    );
                    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
                  })
                  .catch((error) => {
                    dispatch(notificationModalActions.changeType('alert'));
                    dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
                    dispatch(notificationModalActions.changeIsNotificationModalOpen());
                  });
              } else {
                dispatch(notificationModalActions.changeType('alert'));
                dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
                dispatch(notificationModalActions.changeIsNotificationModalOpen());
              }
            });
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
        className='my-5'
        btnBg='blue'
        onClick={handleSubmit}
      />
    </div>
  );
};

export default LoginComponent;
