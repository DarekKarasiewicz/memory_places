import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ArrowUpIcon from 'icons/ArrowUpIcon';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='fixed right-5 bottom-5 flex justify-center items-center w-12 h-12 bg-mainBgColor shadow-itemShadow rounded-full cursor-pointer'
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <ArrowUpIcon className='h-8 w-8' />
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTopButton;
