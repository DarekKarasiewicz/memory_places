import { useTranslation } from 'react-i18next';

import BaseButton from 'Components/Base/BaseButton';
import CookieIcon from 'icons/CookieIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function CookiesInfo(props) {
  const { t } = useTranslation();
  const { fontSize } = useFontSize();

  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-40'>
        <div className='m-auto min-w-sm max-w-lg rounded-[24px] h-auto p-6 bg-secondaryBgColor relative break-all text-textColor'>
          <div className='flex justify-between items-center h-10 pb-4 border-textColor border-b-2'>
            <div className='flex justify-center items-center gap-2'>
              <span className={`capitalize font-medium text-${fontSize}-xl`}>
                {t('common.cookie_title')}
              </span>
              <CookieIcon className='h-8 w-8' />
            </div>
          </div>
          <div className='pt-4 mb-5 text-center'>
            <span className={`text-${fontSize}-lg break-keep`}>{t('common.cookie_info')}</span>
          </div>
          <div className='flex justify-center gap-4 mb-3'>
            <BaseButton name={t('common.cookie_accept')} btnBg='blue' onClick={props.closeModal} />
            <BaseButton
              name={t('common.cookie_cancel')}
              btnBg='red'
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CookiesInfo;
