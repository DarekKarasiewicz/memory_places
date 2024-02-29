import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BaseButton from '../Base/BaseButton';
import { useTranslation } from 'react-i18next';

function NotificationModal(props) {
  const [typeColor, setTypeColor] = useState('');
  const [iconName, setIconName] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (props.type === 'alert') {
      setTypeColor('text-yellow-500');
      setIconName('alert_circle_icon');
    } else if (props.type === 'warning') {
      setTypeColor('text-red-500');
      setIconName('warning_circle_icon');
    } else if (props.type === 'success') {
      setTypeColor('text-green-500');
      setIconName('check_circle_icon');
    } else {
      setTypeColor('text-black');
      setIconName('warning_circle_icon');
    }
  }, [props.type]);
  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div
          className={`m-auto min-w-sm max-w-lg rounded-[24px] border-2 border-black h-auto p-4 bg-white relative break-all`}
        >
          <div className='flex justify-between items-center h-10 pb-4 border-gray-300 border-b-2'>
            <div className='flex justify-center items-center gap-2 text-xl'>
              <img
                src={`./assets/dialog/${iconName}.svg`}
                alt={iconName}
                className='h-8 w-8'
              ></img>
              <span className={`capitalize font-medium ${typeColor}`}>{props.title}</span>
            </div>
            <motion.div
              className='flex justify-center items-center cursor-pointer'
              onClick={props.closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src='./assets/cancel_icon.svg' alt='cancel_icon' className='h-8 w-8'></img>
            </motion.div>
          </div>
          <div className='pt-4 pb-6 text-center'>
            <span className='text-lg'>{props.info}</span>
          </div>
          <div className='flex justify-end gap-2 mb-2'>
            <BaseButton name={t('common.cancel')} onClick={props.closeModal}></BaseButton>
            <BaseButton name={t('common.confirm')}></BaseButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationModal;
