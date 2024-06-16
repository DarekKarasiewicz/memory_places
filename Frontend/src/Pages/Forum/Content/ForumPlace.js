import { useTranslation } from 'react-i18next';

import UserIcon from 'icons/UserIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ForumPlace({ currentData, onClick }) {
  const { t } = useTranslation();
  const { fontSize } = useFontSize();

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
          <div className={`flex items-center gap-2 text-${fontSize}-base`}>
            <UserIcon className='h-6 w-6' />
            <span>{currentData.username}</span>
            <span>- {currentData.creation_date.split('T')[0]}</span>
            {isNew && (
              <span className='rounded-lg bg-thirdBgColor py-1 px-2'>{t('forum.new')}</span>
            )}
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='w-full flex flex-col gap-2'>
            <span className={`text-${fontSize}-xl`}>{currentData.place_name}</span>
            <span className={`text-${fontSize}-base`}>{currentData.description}</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 my-2 text-${fontSize}-xs`}>
          {currentData.sortof_value && (
            <span className='p-1 bg-red-600 rounded-lg'>
              {t(`modal.${currentData.sortof_value}`)}
            </span>
          )}
          <span className='p-1 bg-green-600 rounded-lg'>
            {t(`modal.${currentData.type_value}`)}
          </span>
          <span className='p-1 bg-yellow-600 rounded-lg'>
            {t(`modal.${currentData.period_value}`)}
          </span>
        </div>
      </div>
    </>
  );
}

export default ForumPlace;
