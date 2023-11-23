import { useState } from 'react';
import { motion } from 'framer-motion';

function DropdownItem({ icon, name }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const variantsToFade = {
    hidden: { opacity: 0, x: '-8%' },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div className='flex relative items-center'>
        <div
          className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center bg-slate-300 cursor-pointer z-10 relative'
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={`./assets/${icon}.svg`} alt={icon} className='h-8 w-8'></img>
        </div>
        {isHovering && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={variantsToFade}
            transition={{ duration: 0.5 }}
            className='h-12 w-32 absolute left-6 bg-slate-300 pointer-events-none z-0 pr-2 flex justify-end items-center border-2 border-black rounded-r-lg leading-4'
          >
            <span className='ml-6'>{name ? name : 'Not given name'}</span>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default DropdownItem;
