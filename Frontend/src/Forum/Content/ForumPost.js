import UserIcon from 'icons/UserIcon';
import { useTranslation } from 'react-i18next';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import CommentIcon from 'icons/CommentIcon';
import ShareIcon from 'icons/ShareIcon';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { forumDataActions } from 'Redux/forumDataSlice';
import { useDispatch } from 'react-redux';

function ForumPost({ currentData, location, onClick, locationShare }) {
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();

  if (!currentData || currentData.length === 0) {
    return null;
  }

  const isNew =
    currentData && currentData.created_at
      ? String(new Date().toISOString().split('T')[0]) === currentData.created_at.split('T')[0]
      : false;

  const handleLikeClick = (event, commentId, itemLike) => {
    event.stopPropagation();
    axios
      .put(`http://127.0.0.1:8000/memo_places_forum/post/${commentId}/`, {
        user: user.user_id,
        like: itemLike + 1,
      })
      .then((response) => {
        dispatch(forumDataActions.changeRefreshPlaces(true));
      })
      .catch((error) => {
        if (error.response.data.error === 'User already liked this post') {
          handleDislikeClick(commentId, itemLike);
        }
      });
  };

  const handleDislikeClick = (commentId, itemLike) => {
    axios
      .put(`http://127.0.0.1:8000/memo_places_forum/post/${commentId}/`, {
        user: user.user_id,
        dislike: itemLike - 1,
      })
      .then((response) => {
        dispatch(forumDataActions.changeRefreshPlaces(true));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(locationShare);
  };

  return (
    <>
      <div
        key={currentData.id}
        className='flex flex-col gap-2 hover:border-contrastColor hover:border-2 border-2 border-secondaryBgColor transition p-2 cursor-pointer rounded-lg'
        onClick={onClick}
      >
        <div className='flex justify-start'>
          <div className='flex items-center gap-2'>
            <UserIcon className='h-6 w-6' />
            <div>{currentData.username}</div>
            <div>
              - {currentData && currentData.created_at ? currentData.created_at.split('T')[0] : ''}
            </div>
            {isNew && <div className='rounded-lg bg-thirdBgColor py-1 px-2'>NEW</div>}
          </div>
        </div>
        <div className='text-xl'>{currentData.title}</div>
        <div>{currentData.content}</div>
        <div className='flex gap-2'>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 cursor-pointer hover:text-contrastColor'>
            <div
              className='flex gap-1 hover:scale-105 transition'
              onClick={(event) => handleLikeClick(event, currentData.id, currentData.like)}
            >
              <ArrowUpIcon className='h-6 w-6' />
              <span>{currentData.like}</span>
            </div>
          </div>
          {/* <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
            <div className='flex gap-1 hover:scale-105 transition' onClick={handleCommentClick}>
              <CommentIcon className='h-6 w-6' />
              <span>10</span>
            </div>
          </div> */}
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1 cursor-pointer hover:text-contrastColor'>
            <div className='flex gap-1 hover:scale-105 transition' onClick={handleShareClick}>
              <ShareIcon className='h-6 w-6' />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPost;
