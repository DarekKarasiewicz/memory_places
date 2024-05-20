import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AdminDropdownItem from './AdminDropdownItem/AdminDropdownItem';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import UserIcon from 'icons/UserIcon';

function AdminDropdown() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleMainPageRedirect = () => {
    navigate('/');
  };

  const handleLogout = () => {
    removeCookie('user', { path: '/' });
    navigate('/');
  };

  const menuItems = [
    // { icon: 'notification', name: t('user.notifications') },
    // { icon: 'pin', name: t('user.your_memory_places') },
    { icon: 'map', name: t('user.back_to_main_page'), func: handleMainPageRedirect },
    // { icon: 'settings', name: t('user.settings') },
    // { icon: 'help', name: t('user.help') },
    // { icon: 'contact', name: t('user.contact') },
    { icon: 'logout', name: t('user.logout'), func: handleLogout },
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

  const handleClick = () => {
    setIsActive((current) => !current);
    setIsOpen((current) => !current);
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
      <div className='flex items-center pl-4' ref={wrapperRef}>
        <div className='flex items-center cursor-pointer' onClick={handleClick}>
          <div className='rounded-full h-9 w-9 flex justify-center items-center bg-slate-300 shadow-lg'>
            <UserIcon className='h-6 w-6' />
          </div>
          {isOpen ? <ArrowUpIcon className={'h-7 w-7'} /> : <ArrowDownIcon className={'h-7 w-7'} />}
        </div>
        {isActive && (
          <motion.ul
            className='bg-mainBgColor shadow-itemShadow rounded-lg flex flex-col gap-2 mt-2 absolute top-16 right-2 w-52 p-4 z-10'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>{user.username}</li>
            <li className='uppercase italic text-sm'>
              {user.admin ? t('user.admin') : user.master ? t('user.master_user') : t('user.user')}
            </li>
            <hr className='border-t-1 mt-2 border-textColor' />

            {menuItems.map((item, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === menuItems.length - 1 && <hr className='mb-2 border-textColor' />}
                <AdminDropdownItem
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

export default AdminDropdown;
