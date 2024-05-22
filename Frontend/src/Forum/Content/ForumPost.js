import UserIcon from 'icons/UserIcon';
import { useTranslation } from 'react-i18next';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import CommentIcon from 'icons/CommentIcon';
import ShareIcon from 'icons/ShareIcon';

function ForumPost({ currentData, location, onClick, locationShare }) {
  const { t } = useTranslation();

  if (!currentData || currentData.length === 0) {
    return null;
  }

  const isNew =
    String(new Date().toISOString().split('T')[0]) === currentData.creation_date ? true : false;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log('like');
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    console.log('comment');
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
            <div>- {currentData.creation_date.split('T')[0]}</div>
            {isNew && <div className='rounded-lg bg-thirdBgColor py-1 px-2'>NEW</div>}
          </div>
        </div>
        <div className='text-xl'>{currentData.place_name}</div>
        <div>{currentData.description}</div>
        <div className='flex gap-2'>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 cursor-pointer hover:text-contrastColor'>
            <div className='flex gap-1 hover:scale-105 transition' onClick={handleLikeClick}>
              <ArrowUpIcon className='h-6 w-6' />
              <span>10</span>
            </div>
          </div>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
            <div className='flex gap-1 hover:scale-105 transition' onClick={handleCommentClick}>
              <CommentIcon className='h-6 w-6' />
              <span>10</span>
            </div>
          </div>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
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
