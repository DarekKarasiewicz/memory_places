import { motion } from 'framer-motion';
import { useState } from 'react';

const UserMenuOption = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((current) => !current);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1, color: 'red' }}
        onHoverStart={handleHover}
        onHoverEnd={handleHover}
        className='w-full h-12 cursor-pointer flex gap-2 items-center pl-2'
        onClick={props.onClick ? props.onClick : undefined}
      >
        <img
          src={`./assets/${props.icon}_icon.svg`}
          alt={`${props.icon}`}
          className='h-8 w-8'
        ></img>
        <div className='capitalize leading-5'>{props.name}</div>
      </motion.div>
    </>
  );
};

export default UserMenuOption;
