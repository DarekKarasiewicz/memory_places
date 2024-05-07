import { useState, useEffect } from 'react';
import BaseModal from 'Base/BaseModal';
import { useTranslation } from 'react-i18next';
import LoginComponent from 'LoginAndRegisterComponents/LoginComponent';
import RegisterComponent from 'LoginAndRegisterComponents/RegisterComponent';

const LoginAndRegisterModal = (props) => {
  const [title, setTitle] = useState();
  const [isLogging, setIsLogging] = useState(true);
  const { t } = useTranslation();

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

  return (
    <BaseModal title={title} closeModal={props.closeModal} width='1/3'>
      <div className='flex flex-col p-2 items-center'>
        {isLogging ? <LoginComponent /> : <RegisterComponent setIsLogging={setIsLogging} />}
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
