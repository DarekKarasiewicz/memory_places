import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import ForumPost from './ForumPost';
import UserIcon from 'icons/UserIcon';
import BaseSelect from 'Base/BaseSelect';
import { useNavigate, useLocation } from 'react-router-dom';
import BaseButton from 'Base/BaseButton';

function ForumPostHolder() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const sortRef = useRef(null);
  const { placeid, postid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchPostItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places/places/pk=${postid}`);
      setPost(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const sort_options = [
    { label: 'new', value: 'new' },
    { label: 'old', value: 'old' },
    { label: 'top', value: 'top' },
    { label: 'best', value: 'best' },
  ];

  const locationShareLink = () => {
    return window.location.origin + location.pathname;
  };

  useEffect(() => {
    fetchPostItem();
  }, []);

  return (
    <>
      <div className='w-3/5 flex flex-col gap-6'>
        <div className='flex gap-2'>
          <BaseButton name={t('admin.common.back')} btnBg='red' onClick={() => navigate(-1)} />
        </div>
        <div className='flex flex-col gap-4'>
          <ForumPost key={1} currentData={post} locationShare={locationShareLink()} />
          <div className='flex items-center gap-4 p-2'>
            <span className='w-fit'>Sortuj po: </span>
            <BaseSelect
              disabledLabel={true}
              label='sortby'
              name='sortby'
              width='20'
              options={sort_options}
              ref={sortRef}
              onChange={() => sortRef.current.value}
            />
          </div>
          <div className='flex gap-2 px-2'>
            <UserIcon className='h-6 w-6' />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <div>username</div>
                  <div>- 21.05.2024</div>
                </div>
              </div>
              <div>Wypuście mnie</div>
            </div>
          </div>
          <div className='flex gap-2 px-2'>
            <UserIcon className='h-6 w-6' />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <div>Andrzej</div>
                  <div>- 21.05.2024</div>
                </div>
              </div>
              <div>Z polski nie wyjedziecie</div>
            </div>
          </div>
          <div className='flex gap-2 px-2'>
            <UserIcon className='h-6 w-6' />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <div>Cyprian</div>
                  <div>- 21.05.2024</div>
                </div>
              </div>
              <div>Andrzej polskę zbaw!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPostHolder;
