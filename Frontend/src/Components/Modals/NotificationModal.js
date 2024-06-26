import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions, selectNotificationModal } from 'Redux/notificationModalSlice';
import { globalDataActions } from 'Redux/globalDataSlice';

import BaseButton from 'Components/Base/BaseButton';
import AlertCircleIcon from 'icons/dialog/AlertCircleIcon';
import CheckCircleIcon from 'icons/dialog/CheckCircleIcon';
import WarningCircleIcon from 'icons/dialog/WarningCircleIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function NotificationModal() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectNotificationModal);
  const { type, title } = modalData;
  const { t } = useTranslation();
  const [iconComponent, setIconComponent] = useState(null);
  const { fontSize } = useFontSize();

  const handleNotificationModalVisibility = () => {
    dispatch(globalDataActions.changeBlockWrapperRef(false));
    dispatch(notificationModalActions.changeIsNotificationModalOpen());
  };

  useEffect(() => {
    const iconComponents = {
      alert: <AlertCircleIcon className='h-20 w-20' />,
      success: <CheckCircleIcon className='h-20 w-20' />,
      warning: <WarningCircleIcon className='h-20 w-20' />,
    };

    setIconComponent(iconComponents[type] || null);
  }, [type]);

  return (
    <>
      <motion.div
        className='fixed left-0 right-0 mx-auto top-4 min-w-sm max-w-lg rounded-[24px] shadow-itemShadow h-auto p-4 bg-thirdBgColor break-all text-textColor z-50 flex flex-col gap-4'
        initial={{ y: '50%', opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '50%', opacity: 0, transition: { duration: 0.1 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className='flex justify-center items-center'>
          <div className={`flex flex-col justify-center items-center gap-2 text-${fontSize}-2xl`}>
            {iconComponent}
            <span className='normal-case font-medium'>{title}</span>
          </div>
        </div>
        <div className='flex justify-center gap-2 mb-2'>
          <BaseButton
            name={t('common.close')}
            btnBg='red'
            onClick={() => handleNotificationModalVisibility()}
          />
        </div>
      </motion.div>
    </>
  );
}

export default NotificationModal;
