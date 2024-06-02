import { useState } from 'react';
import { motion } from 'framer-motion';

import ArrowDownIcon from 'icons/ArrowDownIcon';
import ArrowUpIcon from 'icons/ArrowUpIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function FAQItems(props) {
  const [isActive, setIsActive] = useState(false);
  const { fontSize } = useFontSize();

  const handleItemVisibility = () => {
    setIsActive((isActive) => !isActive);
  };

  return (
    <>
      <div className='flex flex-col rounded-xl border'>
        <div
          onClick={handleItemVisibility}
          className='flex justify-between items-center cursor-pointer px-4 py-2'
        >
          <span className={`text-${fontSize}-base`}>{props.title}</span>
          {isActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </div>
        {isActive && (
          <>
            <hr className='mx-2' />
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-${fontSize}-base px-4 py-4`}
            >
              {props.desc}
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

export default FAQItems;
