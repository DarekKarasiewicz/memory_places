import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import Loader from 'Components/Loader/Loader';
import CheckIcon from 'icons/CheckIcon';
import App from 'App';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const VerifiactionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  useEffect(() => {
    axios
      .put(`${appPath}/memo_places/user_verifi/${id}/`)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, []);

  return (
    <App>
      <div className='flex justify-center items-center w-screen h-screen'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='bg-mainBgColor text-textColor flex justify-center items-center w-screen h-screen font-sans'>
              <div className='flex flex-col items-center text-center gap-6 -mt-20'>
                <CheckIcon className='w-40' />
                <p className='text-6xl mb-3'>{t('user.verification_info')}</p>
                <p className={`text-${fontSize}-2xl mb-2`}>{t('user.verification_info2')}</p>
                <Link to='/' className='flex justify-center items-center'>
                  <BaseButton name={t('user.go_to_mainpage')} className={'w-56'} btnBg='blue' />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </App>
  );
};

export default VerifiactionPage;
