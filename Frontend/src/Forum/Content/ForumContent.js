import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ForumPost from './ForumPost';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

function ForumContent() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [posts, setPosts] = useState(null);

  const fetchPostItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places/places/`);
      setPosts(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    fetchPostItems();
  }, []);

  return (
    <>
      <div className='px-10 py-8 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col items-center gap-6 h-full'>
        <div className='w-3/5 flex flex-col gap-6'>
          <div className='text-3xl font-bold'>Popular</div>
          <div className='flex flex-col gap-4'>
            {posts &&
              posts.map((item, index) => (
                <>
                  {index !== 0 && <hr />}
                  <ForumPost key={item.id} currentData={item} />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumContent;
