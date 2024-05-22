import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import ForumPost from './ForumPost';
import BaseButton from 'Base/BaseButton';
import { modalsActions } from 'Redux/modalsSlice';
import { forumDataActions } from 'Redux/forumDataSlice';

function ForumContentPosts({ placeId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPostItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places_forum/post`);
      setPosts(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const locationShareLink = (itemId) => {
    return window.location.origin + location.pathname + '/' + itemId;
  };

  const handlePostAdd = () => {
    dispatch(forumDataActions.changePlaceId(placeId));
    dispatch(modalsActions.changeIsForumPostModalOpen());
  };

  useEffect(() => {
    fetchPostItems();
  }, []);

  return (
    <>
      <div className='w-3/5 flex flex-col gap-6'>
        <div className='flex justify-between gap-2'>
          <BaseButton name={t('admin.common.back')} btnBg='red' onClick={() => navigate(-1)} />
          {/* <BaseButton name='Dodaj post' btnBg='blue' onClick={() => handlePostAdd()} /> */}
        </div>
        <div className='text-3xl font-bold'>Zabytek</div>
        <div className='text-2xl font-semibold'>Posty</div>
        <div className='flex flex-col gap-4'>
          {posts &&
            posts.map((item, index) => (
              <>
                {index !== 0 && <hr />}
                <ForumPost
                  currentData={item}
                  locationShare={locationShareLink(item.id)}
                  onClick={() => navigate(`${location.pathname}/` + item.id)}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default ForumContentPosts;
