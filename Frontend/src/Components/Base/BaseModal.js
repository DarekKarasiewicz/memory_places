import { motion } from 'framer-motion';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function BaseModal(props) {
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
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-40'>
        <motion.div
          className={`m-auto w-${
            props.width ? props.width : '1/2'
          } rounded bg-mainBgColor text-textColor shadow-itemShadow h-auto ${
            props.minHeight ? props.minHeight : ''
          } p-4 relative`}
          variants={parentItem}
          initial='hidden'
          animate='visible'
        >
          {props.title && (
            <div
              className={`text-center border-b-2 border-textColor pb-4 text-${fontSize}-2xl font-bold`}
            >
              {props.title}
            </div>
          )}
          {props.children}
        </motion.div>
      </div>
    </>
  );
}

export default BaseModal;
