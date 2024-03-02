import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { useState, useEffect, useRef } from 'react';
import BaseButton from '../Base/BaseButton';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';

const AddPlaceButton = (props) => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const popupRef = useRef(null);

  useEffect(() => {
    setIsLogged(user ? true : false);
  }, [user]);

  useEffect(() => {
    if (!isLogged) {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setIsActive(false);
          popupRef.current = null;
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  const handleAddClick = (event) => {
    if (isLogged) {
      props.openModal();
    } else {
      setIsActive(!isActive);
      popupRef.current = event.target;
    }
  };

  const handleLoginRedirect = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const childItem = {
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

  const parentItem = {
    hover: {
      scale: isActive ? 1 : 1.05,
    },
  };

  return (
    <motion.div
      whileHover={'hover'}
      variants={parentItem}
      onClick={handleAddClick}
      className={`absolute bottom-7 border-2 border-black bg-slate-300 h-14 w-14 rounded-full cursor-pointer flex justify-center items-center left-0 right-0 m-auto`}
      ref={popupRef}
    >
      {isActive && (
        <motion.div
          className='absolute bg-slate-300 w-80 p-4 border border-black rounded-lg bottom-20 '
          variants={childItem}
          initial='hidden'
          animate='visible'
        >
          <div className='flex flex-col justify-center items-center'>
            <p className='pb-2'>To add place you need to be logged in!</p>
            <BaseButton name='Log in' btnBg='blue' onClick={handleLoginRedirect} />
          </div>
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-slate-300 border-r border-b border-black'></div>
        </motion.div>
      )}
      <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-14 w-14'></img>
    </motion.div>
  );
};

export default AddPlaceButton;
