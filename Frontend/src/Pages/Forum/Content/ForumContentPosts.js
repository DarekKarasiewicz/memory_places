import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { modalsActions } from 'Redux/modalsSlice';
import { selectForumData, forumDataActions } from 'Redux/forumDataSlice';

import ForumPost from './ForumPost';
import BaseButton from 'Components/Base/BaseButton';
import SearchBar from './SearchBar/SearchBar';
import BaseSelect from 'Components/Base/BaseSelect';

function ForumContentPosts({ placeId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const forumData = useSelector(selectForumData);
  const sortRef = useRef();
  const [searchedText, setSearchedText] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blockPostFetching, setBlockPostFetching] = useState(false);

  const fetchPostItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/memo_places_forum/post/place=${placeId}`,
      );
      setPosts(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPostItemsAdvanced = async (search = null, sortType, page) => {
    try {
      let postEndpointUrl = `http://localhost:8000/memo_places_forum/post/place=${placeId}`;

      if (search) {
        postEndpointUrl += `?title=${search}`;
      }

      if (sortType === 'like_asc') {
        postEndpointUrl += `?sort=like`;
      } else if (sortType === 'like_desc') {
        postEndpointUrl += `?sort=-like`;
      } else if (sortType === 'old') {
        postEndpointUrl += `?sort=created_at`;
      } else if (sortType === 'new') {
        postEndpointUrl += `?sort=-created_at`;
      } else {
        postEndpointUrl += '';
      }

      if (page !== undefined) {
        if (postEndpointUrl.includes('?')) {
          postEndpointUrl += `&page=${page}`;
        } else {
          postEndpointUrl += `?page=${page}`;
        }
      }

      const response = await axios.get(postEndpointUrl);

      console.log(response.data);

      if (response.data.length === 0) {
        if (postEndpointUrl.includes('title')) {
          setPosts([]);
        } else {
          setBlockPostFetching(true);
        }
        return;
      }

      const isDataSame = response.data.every((newPost) =>
        posts.some((existingPost) => existingPost.id === newPost.id),
      );

      if (!isDataSame) {
        if (posts.length === 0 || postEndpointUrl.includes('title')) {
          setPosts(response.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }
      } else {
        setBlockPostFetching(true);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const sort_options = [
    { label: t('forum.select_old'), value: 'old' },
    { label: t('forum.select_new'), value: 'new' },
    { label: t('forum.select_like_asc'), value: 'like_asc' },
    { label: t('forum.select_like_desc'), value: 'like_desc' },
  ];

  const locationShareLink = (itemId) => {
    return window.location.origin + location.pathname + '/' + itemId;
  };

  const handlePostAdd = () => {
    dispatch(forumDataActions.changePlaceId(placeId));
    dispatch(modalsActions.changeIsForumPostModalOpen());
  };

  const changePostSortOption = (sortType) => {
    fetchPostItemsAdvanced(searchedText, sortType);
  };

  const handleSearchPost = (value) => {
    setSearchedText(value);
    fetchPostItemsAdvanced(value);
  };

  const loadNewPosts = () => {
    setCurrentPage(currentPage + 1);
    fetchPostItemsAdvanced(searchedText, sortRef.current.value, currentPage + 1);
  };

  useEffect(() => {
    fetchPostItems();
  }, []);

  useEffect(() => {
    fetchPostItems();
    dispatch(forumDataActions.changeRefreshPlaces(false));
  }, [forumData.refresh_places]);

  return (
    <>
      <div className='w-3/5 flex flex-col gap-6'>
        <div className='flex justify-between gap-2'>
          <BaseButton name={t('admin.common.back')} btnBg='red' onClick={() => navigate(-1)} />
          <BaseButton name={t('forum.add_post')} btnBg='blue' onClick={() => handlePostAdd()} />
        </div>
        <div>
          <SearchBar onSearchClick={handleSearchPost} />
        </div>
        <div className='text-3xl font-bold'>{forumData.header_name}</div>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-semibold'>{t('forum.posts')}</div>
          <div className='flex justify-end items-center gap-4'>
            <span className='w-fit'>{t('forum.sort_by')}</span>
            <BaseSelect
              disabledLabel={true}
              disabledParentFull={true}
              name='sortby'
              width='25'
              options={sort_options}
              ref={sortRef}
              onChange={() => changePostSortOption(sortRef.current.value)}
            />
          </div>
        </div>
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
          {posts?.length > 0 && (
            <div className='flex justify-center mt-2'>
              <BaseButton
                name={t('forum.more_posts')}
                btnBg='blue'
                onClick={() => loadNewPosts(sortRef.current.value)}
                disabled={blockPostFetching}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForumContentPosts;
