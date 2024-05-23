import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BaseButton from 'Base/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import AddingOption from './AddingOpction';
import PlusIcon from 'icons/PlusIcon';
import CancelIcon from 'icons/CancelIcon';
import { userPlacesActions,selectUserPlaces } from 'Redux/userPlacesSlice';

const AddPlaceButton = (props) => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const popupRef = useRef(null);
  const { t } = useTranslation();
  const isUserPlacesOpen = useSelector(selectUserPlaces).isOpen;

  useEffect(() => {
    setIsLogged(user?.refreshToken ? true : false);
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

      if(isUserPlacesOpen === true) dispatch(userPlacesActions.changeIsOpen());
      setIsSelecting(!isSelecting);
    } else {
      setIsActive(!isActive);
      popupRef.current = event.target;
    }
  };

  const handleLoginRedirect = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

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
    <motion.div
      whileHover={{ scale: isActive || isSelecting ? 1 : 1.05 }}
      variants={parentItem}
      onClick={handleAddClick}
      className={`absolute bottom-11 bg-mainBgColor h-14 w-14 rounded-full cursor-pointer flex justify-center items-center left-0 right-0 m-auto shadow-itemShadow`}
      ref={popupRef}
    >
      {isActive && (
        <motion.div
          className='absolute bg-mainBgColor w-auto px-4 py-6 rounded-lg bottom-20 shadow-itemShadow'
          variants={childItem}
          initial='hidden'
          animate='visible'
        >
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='pb-2 text-lg text-textColor whitespace-nowrap'>{t('user.add_place_login_req')}</p>
            <BaseButton name='Log in' btnBg='blue' onClick={handleLoginRedirect} />
          </div>
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-mainBgColor'></div>
        </motion.div>
      )}
      {isSelecting && (
        <motion.div
          className='absolute bottom-16 w-32 flex flex-row justify-between items-center'
          variants={parentItem}
          initial='hidden'
          animate='visible'
        >
          <AddingOption type='place' />
          <AddingOption type='trail' />
        </motion.div>
      )}
      {!isSelecting ? <PlusIcon className='h-10 w-10' /> : <CancelIcon className='h-10 w-10' />}
    </motion.div>
  );
};

export default AddPlaceButton;
