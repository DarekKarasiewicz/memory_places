import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import UserMenuOption from './UserMenuOption/UserMenuOption';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../../Redux/modalsSlice';
import { userPlacesActions } from '../../Redux/userPlacesSlice';
import BaseButton from '../../Base/BaseButton';
import { useCookies } from 'react-cookie';

function UserMenu() {
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cookies] = useCookies(['user']);
  const dispatch = useDispatch();
  const user = cookies.user;

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  const handleUserPlacesVisability = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleLoginModalOpen = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
    handleClick();
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

  useEffect(() => {
    setIsLogged(user ? true : false);
  }, []);

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
          {/*TODO when avatars will be implemented rewrite this code */}
          <img
            src={`./assets/${isLogged ? 'user_icon' : 'user_icon'}.svg`}
            alt={`${isLogged ? 'user_icon' : 'user_icon'}`}
            className='h-8 w-8'
          ></img>
        </motion.div>
        {isActive &&
          (isLogged ? (
            <motion.ul
              className='bg-slate-300 flex flex-col gap-2 mt-2 absolute top-12 right-0 w-52 p-4'
              variants={parentItem}
              initial='hidden'
              animate='visible'
            >
              <li className='capitalize text-xl'>{user.username}</li>
              <li className='uppercase text-sm'>{user.admin ? 'admin' : 'user'}</li>

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
          ) : (
            <motion.div
              className='bg-slate-300 flex flex-col gap-2 mt-2 absolute top-12 right-0 w-52 p-4 justify-center items-center'
              variants={parentItem}
              initial='hidden'
              animate='visible'
            >
              <span className='text-center'>For full app experience you need to log in!</span>
              <BaseButton name='Log In' onClick={handleLoginModalOpen} />
            </motion.div>
          ))}
      </div>
    </>
  );
}

export default UserMenu;
