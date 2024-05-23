import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import UserMenuOption from './UserMenuOption/UserMenuOption';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { userPlacesActions, selectUserPlaces } from 'Redux/userPlacesSlice';
import BaseButton from 'Base/BaseButton';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import UserIcon from 'icons/UserIcon';

function UserMenu() {
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const user = cookies.user;
  const popupRef = useRef(null);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isUserPlacesOpen = useSelector(selectUserPlaces).isOpen;

  useEffect(() => {
    if (!isLogged) {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setIsPopupOpen(false);
          popupRef.current = null;
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  const handleUserSettingsVisability = () => {
    dispatch(modalsActions.changeIsUserSettingsOpen());
  };

  const handleUserPlacesVisability = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleLoginModalOpen = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };

  const handleLogout = () => {
    setIsActive(false);
    removeCookie('user', { path: '/' });
    if (isUserPlacesOpen === true) dispatch(userPlacesActions.changeIsOpen());
  };

  const handleAdminDashboardRedirect = () => {
    navigate('/adminDashboard');
  };

  const handleFAQVisability = () => {
    dispatch(modalsActions.changeIsFAQOpen());
  };

  const handleContactFormVisability = () => {
    dispatch(modalsActions.changeIsContactFormOpen());
  };

  const handleClick = (event) => {
    if (isLogged) {
      setIsActive((current) => !current);
      setIsOpen((current) => !current);
    } else {
      setIsPopupOpen((current) => !current);
      popupRef.current = event.target;
    }
  };

  const menuItems = [
    // { icon: 'notification', name: t('user.notifications') },
    { icon: 'pin', name: t('user.your_memory_places'), func: handleUserPlacesVisability },
    {
      icon: 'user',
      name: t('user.admin_panel'),
      func: handleAdminDashboardRedirect,
      isAdministration: true,
    },
    { icon: 'settings', name: t('user.settings'), func: handleUserSettingsVisability },
    { icon: 'help', name: t('user.help'), func: handleFAQVisability },
    { icon: 'contact', name: t('user.contact'), func: handleContactFormVisability },
    { icon: 'logout', name: t('user.logout'), func: handleLogout },
  ];

  const isAdminOrMaster = user && (user.admin || user.master);

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.isAdministration) {
      return isAdminOrMaster;
    }
    return true;
  });

  useEffect(() => {
    setIsLogged(user?.refreshToken ? true : false);
  }, [user]);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <div className='relative' ref={wrapperRef}>
        <div className='flex items-center cursor-pointer' onClick={handleClick} ref={popupRef}>
          <div className='rounded-full h-9 w-9 flex justify-center items-center bg-slate-300 shadow-lg'>
            <UserIcon className='h-6 w-6' />
          </div>
          {isOpen ? <ArrowUpIcon className={'h-7 w-7'} /> : <ArrowDownIcon className={'h-7 w-7'} />}
        </div>
        {isActive && (
          <motion.ul
            className='bg-mainBgColor text-textColor shadow-itemShadow rounded-lg flex flex-col gap-2 absolute top-12 right-0 w-52 p-4 z-10'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>{user.username}</li>
            <li className='uppercase text-sm italic'>
              {user.admin ? t('user.admin') : user.master ? t('user.master_user') : t('user.user')}
            </li>
            <hr className='border-t-1 mt-2 border-textColor' />

            {filteredMenuItems.map((item, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === filteredMenuItems.length - 1 && <hr className='mb-2 border-textColor' />}
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
        {isPopupOpen && (
          <motion.div
            className='bg-mainBgColor text-textColor flex flex-col gap-3 mt-2 absolute top-16 right-5 w-52 p-4 justify-center items-center z-1'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <span className='text-center'>{t('user.login_info')}</span>
            <BaseButton name={t('user.login')} btnBg='blue' onClick={handleLoginModalOpen} />
            <div className='absolute right-[8px] top-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-mainBgColor'></div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default UserMenu;
