import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { selectForumData, forumDataActions } from 'Redux/forumDataSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import ForumPost from './ForumPost';
import UserIcon from 'icons/UserIcon';
import BaseSelect from 'Components/Base/BaseSelect';
import BaseButton from 'Components/Base/BaseButton';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import BaseTextarea from 'Components/Base/BaseTextarea';

import { registerAppChanges } from 'utils';

function ForumPostHolder() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const sortRef = useRef(null);
  const [isSortChanged, setisSortChanged] = useState(false);
  const { placeid, postid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const forumData = useSelector(selectForumData);
  const contentRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blockCommentFetching, setBlockCommentFetching] = useState(false);

  const fetchPostItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places_forum/post/pk=${postid}`);
      setPost(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchCommentItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/memo_places_forum/comment/post=${postid}`,
      );
      setComment(response.data);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchCommentItemsAdvanced = async (sortType, page) => {
    try {
      let commentEndpointUrl = `http://localhost:8000/memo_places_forum/comment/post=${postid}`;

      if (isSortChanged) {
        const sortMapping = {
          like_asc: 'like',
          like_desc: '-like',
          old: 'created_at',
          new: '-created_at',
        };

        const sortParam = sortMapping[sortType];
        if (sortParam) {
          commentEndpointUrl += `?sort=${sortParam}`;
        }
      }

      if (page !== undefined) {
        if (commentEndpointUrl.includes('?')) {
          commentEndpointUrl += `&page=${page}`;
        } else {
          commentEndpointUrl += `?page=${page}`;
        }
      }

      const response = await axios.get(commentEndpointUrl);

      if (response.data.length === 0) {
        setBlockCommentFetching(true);
        return;
      }

      if (comment.length === 0) {
        setComment(response.data);
      } else {
        if (commentEndpointUrl.includes('sort')) {
          setComment(response.data);
        } else {
          setComment((prevComments) => [...prevComments, ...response.data]);
        }
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

  const locationShareLink = () => {
    return window.location.origin + location.pathname;
  };

  const handleLikeClick = (event, commentId, itemLike) => {
    event.stopPropagation();

    if (user.id) {
      axios
        .put(`http://127.0.0.1:8000/memo_places_forum/comment/${commentId}/`, {
          user: user.user_id,
          like: itemLike + 1,
        })
        .then((response) => {
          fetchCommentItems();
        })
        .catch((error) => {
          if (error.response.data.error === 'User already liked this comment') {
            handleDislikeClick(commentId, itemLike);
          }
        });
    }
  };

  const handleDislikeClick = (commentId, itemLike) => {
    if (user.id) {
      axios
        .put(`http://127.0.0.1:8000/memo_places_forum/comment/${commentId}/`, {
          user: user.user_id,
          dislike: itemLike - 1,
        })
        .then((response) => {
          fetchCommentItems();
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const handleCommentAdd = (postId) => {
    if (user.id) {
      axios
        .post(`http://127.0.0.1:8000/memo_places_forum/comment/`, {
          user: user.user_id,
          content: contentRef.current.value,
          post: postId,
        })
        .then((response) => {
          dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
          dispatch(confirmationModalActions.changeType('success'));
          registerAppChanges('Utworzono komentarz o ID', user);
          fetchCommentItems();
          handleCommentClose();
        })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('modal.permission_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const changeCommentSortOption = (sortType) => {
    setisSortChanged(true);
    fetchCommentItemsAdvanced(sortType);
  };

  const loadNewComments = () => {
    setCurrentPage(currentPage + 1);
    fetchCommentItemsAdvanced(sortRef.current.value, currentPage + 1);
  };

  const handleCommentClose = () => {
    setIsActive(false);
    contentRef.current.value = '';
  };

  function removeLastNumberFromUrl(url, lastItem) {
    if (url.endsWith(`/${lastItem}`)) {
      return url.slice(0, url.lastIndexOf(`/${lastItem}`));
    } else {
      return url;
    }
  }

  useEffect(() => {
    fetchPostItem();
    dispatch(forumDataActions.changeRefreshPlaces(false));
  }, [forumData.refresh_places]);

  useEffect(() => {
    fetchPostItem();
    fetchCommentItems();
  }, []);

  return (
    <>
      <div className='w-3/5 flex flex-col gap-6'>
        <div className='flex gap-2'>
          <BaseButton
            name={t('admin.common.back')}
            btnBg='red'
            onClick={() => {
              navigate(removeLastNumberFromUrl(location.pathname, post.id));
            }}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <ForumPost key={1} currentData={post} locationShare={locationShareLink()} />
          <div className='flex justify-start items-center gap-4 p-2'>
            <span className='w-fit'>{t('forum.sort_by')}</span>
            <BaseSelect
              disabledLabel={true}
              disabledParentFull={true}
              label='sortby'
              name='sortby'
              width='25'
              options={sort_options}
              ref={sortRef}
              onChange={() => changeCommentSortOption(sortRef.current.value)}
            />
          </div>
          <div className={`flex ${isActive ? 'items-start' : 'items-center'} gap-3 pb-3`}>
            <UserIcon className='h-8 w-8' />
            <div className='flex flex-col gap-2 w-2/3'>
              <div className='flex flex-col gap-2'>
                <BaseTextarea
                  type='text'
                  name='contentInput'
                  rows={`${isActive ? '4' : '1'}`}
                  className={`${isActive ? 'max-h-32' : 'h-12'}`}
                  placeholder={t('forum.add_comment')}
                  onSelect={() => setIsActive(true)}
                  ref={contentRef}
                />
                {isActive && (
                  <div className='flex justify-end gap-4'>
                    <BaseButton
                      name={t('common.cancel')}
                      btnBg='red'
                      onClick={() => handleCommentClose()}
                    />
                    <BaseButton
                      name={t('admin.common.add')}
                      btnBg='blue'
                      onClick={() => handleCommentAdd(post.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {comment &&
            comment.map((item, index) => (
              <div key={index} className='flex gap-2 px-2'>
                <UserIcon className='h-6 w-6' />
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <div>{item.username}</div>
                      <div>- {item.created_at && item.created_at.split('T')[0]}</div>
                    </div>
                  </div>
                  <div className='break-anywhere'>{item.content}</div>
                  <div className='rounded-lg bg-thirdBgColor py-1 px-2 cursor-pointer hover:text-contrastColor w-fit'>
                    <div
                      className='flex gap-1 hover:scale-105 transition'
                      onClick={() => handleLikeClick(event, item.id, item.like)}
                    >
                      <ArrowUpIcon className='h-6 w-6' />
                      <span>{item.like}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {comment?.length > 0 && (
            <div className='flex justify-center mt-2'>
              <BaseButton
                name={t('forum.more_comments')}
                btnBg='blue'
                onClick={() => loadNewComments()}
                disabled={blockCommentFetching}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForumPostHolder;
