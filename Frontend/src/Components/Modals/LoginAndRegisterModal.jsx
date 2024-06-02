import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { modalsActions } from 'Redux/modalsSlice';
import { useDispatch } from 'react-redux';

import BaseModal from 'Components/Base/BaseModal';
import LoginComponent from 'Components/LoginAndRegisterComponents/LoginComponent';
import RegisterComponent from 'Components/LoginAndRegisterComponents/RegisterComponent';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const LoginAndRegisterModal = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [isLogging, setIsLogging] = useState(true);
  const { t } = useTranslation();
  const wrapperRef = useRef(null);
  const { fontSize } = useFontSize();

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(modalsActions.changeIsLoginAndRegisterOpen());
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <BaseModal title={title} closeModal={props.closeModal} width='1/3'>
      <div className='flex flex-col p-2 items-center' ref={wrapperRef}>
        {isLogging ? <LoginComponent /> : <RegisterComponent setIsLogging={setIsLogging} />}
        {isLogging ? (
          <p className={`text-${fontSize}-base`}>
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
            className={`cursor-pointer text-blue-400 hover:text-blue-600 hover:underline text-${fontSize}-3xl`}
          >
            {t('common.sign_account')}
          </p>
        )}
      </div>
    </BaseModal>
  );
};

export default LoginAndRegisterModal;
