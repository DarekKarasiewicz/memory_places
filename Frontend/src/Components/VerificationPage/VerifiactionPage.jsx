import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseButton from 'Components/Base/BaseButton';
import Loader from 'Components/Loader/Loader';

const VerifiactionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // decode id here

    axios
      .put(`http://localhost:8000/memo_places/user_verifi/${id}/`)
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
    <div className='flex justify-center items-center w-screen h-screen'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='bg-slate-300 p-10 rounded-lg'>
          <p className='text-3xl mb-3'>Your account has been verified</p>
          <p className='text-lg mb-2'>Now you can enjoy the full experience of Memorial Places</p>
          <Link to='/' className='flex justify-center items-center'>
            <BaseButton name='Go back to main page' className={'w-56'} btnBg='blue' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifiactionPage;
