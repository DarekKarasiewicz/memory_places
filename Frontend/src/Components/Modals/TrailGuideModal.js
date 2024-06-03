import { useTranslation } from 'react-i18next';
import { modalsActions } from 'Redux/modalsSlice.jsx';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import BaseButton from 'Components/Base/BaseButton';
import DrawLineIcon from 'icons/DrawLineIcon';
import UndoIcon from 'icons/UndoIcon';
import HandGrabIcon from 'icons/HandGrabIcon';
import AcceptIcon from 'icons/AcceptIcon';
import CancelIcon from 'icons/CancelIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function TrailGuideModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fontSize } = useFontSize();

  const parentItem = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        className='absolute flex justify-center items-center h-full w-full'
        variants={parentItem}
        initial='hidden'
        animate='visible'
      >
        <div className='p-4 bg-mainBgColor shadow-itemShadow text-textColor rounded-xl w-1/2 max-xl:w-3/4'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='flex flex-col justify-center items-center gap-4 mb-2'>
              <p className={`text-${fontSize}-xl`}>{t('modal.how_use_trail')}</p>
              <ul className={`text-${fontSize}-lg list-disc pl-6`}>
                <li>
                  <div className='flex items-center gap-2'>
                    <span>{t('modal.how_use_trail1')}</span>
                    <DrawLineIcon />
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <span>{t('modal.how_use_trail2')}</span>
                    <UndoIcon />
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <span>{t('modal.how_use_trail3')}</span>
                    <HandGrabIcon />
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <span>{t('modal.how_use_trail4')}</span>
                    <AcceptIcon />
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <span>{t('modal.how_use_trail5')}</span>
                    <CancelIcon />
                  </div>
                </li>
              </ul>
            </div>
            <BaseButton
              name={t('common.close')}
              btnBg='red'
              onClick={() => dispatch(modalsActions.changeIsTrailGuideModalOpen())}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default TrailGuideModal;
