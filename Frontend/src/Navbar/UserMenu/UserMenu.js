import { motion } from 'framer-motion';
import { useState } from 'react';
import UserMenuOption from './UserMenuOption/UserMenuOption';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions, selectModals } from '../../Redux/modalsSlice';
import { userPlacesActions } from '../../Redux/userPlacesSlice';

function UserMenu() {
  //In future get from session on storage current user
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  const handleUserPlacesVisability = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const menuItems = [
    { icon: 'notification', name: 'notifications' },
    { icon: 'pin', name: 'your memory places', func: handleUserPlacesVisability },
    { icon: 'settings', name: 'settings', func: handleUserSettingsVisability },
    { icon: 'help', name: 'help' },
    { icon: 'logout', name: 'logout' },
  ];

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
            className='bg-slate-300 flex flex-col gap-2 mt-2 absolute top-12 right-0 w-52 p-4'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>Username here!</li>
            <li className='uppercase text-sm'>admin</li>

            {menuItems.map((item, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === menuItems.length - 1 && <hr className='mb-2' />}
                <UserMenuOption
                  index={index}
                  icon={item.icon}
                  name={item.name}
                  onClick={item.func}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
}

export default UserMenu;
