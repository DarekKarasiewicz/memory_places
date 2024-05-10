import BaseModal from 'Base/BaseModal';
import BaseButton from 'Base/BaseButton';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

function FoundationInfo(props) {
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <BaseModal closeModal={props.closeModal}>
        <div ref={wrapperRef} className='flex flex-col justify-center items-center p-2 gap-4'>
          <img src='../assets/foundation_photo.jpg' alt='foundation_photo' />
          <div className='flex flex-col justify-center items-center gap-4 mb-2'>
            <p className='text-3xl'>Fundacja Miejsca Pamięci</p>
            <p className='text-xl'>Fundacja Miejsca Pamięci - {t('common.foundation_info')}</p>
          </div>
          <BaseButton name={t('common.close')} btnBg='red' onClick={props.closeModal} />
        </div>
      </BaseModal>
    </>
  );
}

export default FoundationInfo;
