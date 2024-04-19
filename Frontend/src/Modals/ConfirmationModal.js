import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmationModalActions, selectConfirmationModal } from '../Redux/confirmationModalSlice';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import CheckIcon from '../icons/CheckIcon';
import CancelIcon from '../icons/CancelIcon';

function ConfirmationModal() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectConfirmationModal);
  const { type } = modalData;
  const { t } = useTranslation();
  const [progress, setProgress] = useState(100);

  const handleConfirmationModalVisibility = () => {
    dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  };

  useEffect(() => {
    const decrementAmount = (100 / 5000) * 50;
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress - decrementAmount);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConfirmationModalVisibility();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          className='absolute flex bottom-6 right-6 z-50'
          initial={{ x: '50%', opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: '50%', opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className={`rounded-xl shadow-itemShadow bg-mainBgColor relative flex flex-col`}>
            <div className='flex justify-center items-center px-4 py-3 rounded-xl'>
              <div className='flex gap-2 justify-center items-center text-textColor min-w-64'>
                {type === 'success' ? (
                  <>
                    <CheckIcon color='#22c55e' className='h-12 w-12' />
                    <span className='text-xl text-green-500 font-bold'>
                      {t('admin.content.alert_success')}
                    </span>
                  </>
                ) : (
                  <>
                    <CancelIcon color='#ef4444' className='h-12 w-12' />
                    <span className='text-xl text-red-500 font-bold'>
                      {t('admin.content.alert_error')}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div
              className={`h-1 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}
              style={{ width: `${progress}%`, transition: 'width 0.25s' }}
            ></div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default ConfirmationModal;