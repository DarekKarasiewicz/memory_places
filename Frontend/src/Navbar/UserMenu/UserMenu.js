import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import UserMenuOption from './UserMenuOption/UserMenuOption';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../../Redux/modalsSlice';
import { userPlacesActions } from '../../Redux/userPlacesSlice';
import BaseButton from '../../Base/BaseButton';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const user = cookies.user;
  const popupRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    } else {
      setIsPopupOpen((current) => !current);
      popupRef.current = event.target;
    }
  };

  const menuItems = [
    { icon: 'notification', name: t('user.notifications') },
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

  const isAdminOrMaster = user.admin || user.master;

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

  return (
    <>
      <div className='relative'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300'
          onClick={handleClick}
          ref={popupRef}
        >
          {/*TODO when avatars will be implemented rewrite this code */}
          <img
            src={`./assets/${isLogged ? 'user_icon' : 'user_icon'}.svg`}
            alt={`${isLogged ? 'user_icon' : 'user_icon'}`}
            className='h-8 w-8'
          ></img>
        </motion.div>
        {isActive && (
          <motion.ul
            className='bg-slate-300 flex flex-col gap-2 mt-2 absolute top-12 right-0 w-52 p-4 z-10'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>{user.username}</li>
            <li className='uppercase text-sm'>
              {user.admin ? t('user.admin') : user.master ? t('user.master_user') : t('user.user')}
            </li>

            {filteredMenuItems.map((item, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === filteredMenuItems.length - 1 && <hr className='mb-2' />}
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
            className='bg-slate-300 flex flex-col gap-2 mt-2 absolute top-16 right-0 w-52 p-4 justify-center items-center border border-black '
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <span className='text-center'>{t('user.login_info')}</span>
            <BaseButton name={t('user.login')} btnBg='blue' onClick={handleLoginModalOpen} />
            <div className='absolute right-[8px] top-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-slate-300 border-l border-t border-black'></div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default UserMenu;
