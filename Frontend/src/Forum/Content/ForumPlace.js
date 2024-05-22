import UserIcon from 'icons/UserIcon';
import { useTranslation } from 'react-i18next';

function ForumPlace({ currentData, onClick }) {
  const { t } = useTranslation();

  if (!currentData || currentData.length === 0) {
    return null;
  }

  const isNew =
    String(new Date().toISOString().split('T')[0]) === currentData.creation_date ? true : false;

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
        <div className='flex gap-2'>
          <div className='w-1/3'>
            <img
              src='https://placehold.co/300x300'
              alt='placeholder-image'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-2/3'>
            <div className='text-xl'>{currentData.place_name}</div>
            <div>{currentData.description}</div>
          </div>
        </div>
        <div className='flex gap-2 my-2'>
          <div className='p-1 bg-red-600 text-xs rounded-lg'>
            {t(`modal.${currentData.sortof_value}`)}
          </div>
          <div className='p-1 bg-green-600 text-xs rounded-lg'>
            {t(`modal.${currentData.type_value}`)}
          </div>
          <div className='p-1 bg-yellow-600 text-xs rounded-lg'>
            {t(`modal.${currentData.period_value}`)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPlace;
