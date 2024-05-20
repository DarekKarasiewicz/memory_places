import UserIcon from 'icons/UserIcon';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'icons/CheckIcon';
import CancelIcon from 'icons/CancelIcon';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import CommentIcon from 'icons/CommentIcon';
import ShareIcon from 'icons/ShareIcon';

function ForumPost({ currentData }) {
  const { t } = useTranslation();

  if (!currentData || currentData.length === 0) {
    return null;
  }

  const isNew = String(new Date()) === currentData.creation_date.split('T')[0] ? true : false;

  return (
    <>
      <div
        key={currentData.id}
        className='flex flex-col gap-2 hover:border-contrastColor hover:border-2 border-2 border-secondaryBgColor transition p-2 cursor-pointer rounded-lg'
      >
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <UserIcon className='h-6 w-6' />
            <div>{currentData.username}</div>
            <div>- {currentData.creation_date.split('T')[0]}</div>
            {isNew && <div className='rounded-lg bg-thirdBgColor py-1 px-2'>NEW</div>}
          </div>
          <div className='rounded-lg bg-thirdBgColor p-1'>
            {currentData.isVerified ? (
              <CheckIcon className='h-6 w-6' />
            ) : (
              <CancelIcon className='h-6 w-6' />
            )}
          </div>
        </div>
        <div className='text-xl'>{currentData.place_name}</div>
        <div className='mb-2'>{currentData.description}</div>
        <div className='flex gap-2'>
          <div className='p-1 bg-red-500 text-xs rounded-lg'>
            {t(`modal.${currentData.sortof_value}`)}
          </div>
          <div className='p-1 bg-green-500 text-xs rounded-lg'>
            {t(`modal.${currentData.type_value}`)}
          </div>
          <div className='p-1 bg-yellow-500 text-xs rounded-lg'>
            {t(`modal.${currentData.period_value}`)}
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
            <ArrowUpIcon className='h-6 w-6' />
            <span>10</span>
          </div>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
            <CommentIcon className='h-6 w-6' />
            <span>10</span>
          </div>
          <div className='rounded-lg bg-thirdBgColor py-1 px-2 flex gap-1'>
            <ShareIcon className='h-6 w-6' />
            <span>Share</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPost;
