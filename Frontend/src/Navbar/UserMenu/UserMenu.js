import { motion } from 'framer-motion';
import { useState } from 'react';
import UserMenuOption from './UserMenuOption/UserMenuOption';

function UserMenu() {
  //In future get from session on storage current user
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const menuItems = ['account', 'settings', 'help', 'logout'];

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

  const childItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <div className='relative'>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300'
          onClick={handleClick}
        >
          <img
            src={`./assets/${isLogged ? 'user_icon' : 'user_icon'}.svg`}
            alt={`${isLogged ? 'user_icon' : 'user_icon'}`}
            className='h-8 w-8'
          ></img>
        </motion.div>
        {isActive && (
          <motion.ul
            className='bg-slate-500 flex flex-col gap-2 mt-2 absolute top-12 right-0 w-52 p-4'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>Username here!</li>
            <li className='uppercase text-sm'>admin</li>
            {menuItems.map((value, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === menuItems.length - 1 && <hr className='mb-2' />}
                <UserMenuOption index={index} icon={value} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
}

export default UserMenu;
