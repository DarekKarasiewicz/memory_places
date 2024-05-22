import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import ForumPost from './ForumPost';
import UserIcon from 'icons/UserIcon';
import BaseSelect from 'Base/BaseSelect';

function ForumPlacesHolder({ postId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const sortRef = useRef(null);

  if (!postId) {
    return null;
  }

  const fetchPostItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places/places/pk=${postId}`);
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

  useEffect(() => {
    fetchPostItem();
  }, []);

  return (
    <>
      <div className='px-10 py-8 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col items-center gap-6 h-full'>
        <div className='w-3/5 flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <ForumPost key={1} currentData={post} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPlacesHolder;
