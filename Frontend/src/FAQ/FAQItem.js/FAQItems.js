import { useState } from 'react';
import { motion } from 'framer-motion';

function FAQItems(props) {
  const [isActive, setIsActive] = useState(false);

  const handleItemVisibility = () => {
    setIsActive((isActive) => !isActive);
  };

  return (
    <>
      <div className='flex flex-col rounded-xl border'>
        <div
          onClick={handleItemVisibility}
          className='flex justify-between items-center max-h-10 cursor-pointer p-2'
        >
          <span>{props.title}</span>
          {isActive ? (
            <img src='./assets/arrow_up_icon.svg' alt='arrow_up_icon' className='h-8 w-8' />
          ) : (
            <img src='./assets/arrow_down_icon.svg' alt='arrow_down_icon' className='h-8 w-8' />
          )}
        </div>
        <hr className='mx-2' />
        {isActive && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='p-2'
          >
            {props.desc}
          </motion.div>
        )}
      </div>
    </>
  );
}

export default FAQItems;
