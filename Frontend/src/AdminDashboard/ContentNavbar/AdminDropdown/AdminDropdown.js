import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AdminDropdownItem from './AdminDropdownItem/AdminDropdownItem';

function AdminDropdown() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

  const menuItems = [
    { icon: 'notification', name: t('user.notifications') },
    { icon: 'pin', name: t('user.your_memory_places') },
    { icon: 'settings', name: t('user.settings') },
    { icon: 'help', name: t('user.help') },
    { icon: 'contact', name: t('user.contact') },
    { icon: 'logout', name: t('user.logout') },
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

  const handleClick = (event) => {
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
      <div className='pl-4' ref={wrapperRef}>
        <div className='flex items-center cursor-pointer' onClick={handleClick}>
          <div className='rounded-full h-10 w-10 flex justify-center items-center bg-slate-300 shadow-lg'>
            <img src='./assets/user_icon.svg' alt='user_icon' className='h-6 w-6'></img>
          </div>
          {isOpen ? (
            <img className='h-6 w-6' src='./assets/arrow_up_icon.svg' alt='up arrow icon'></img>
          ) : (
            <img className='h-6 w-6' src='./assets/arrow_down_icon.svg' alt='down arrow icon'></img>
          )}
        </div>
        {isActive && (
          <motion.ul
            className='bg-mainBgColor flex flex-col gap-2 mt-2 absolute top-16 right-2 w-52 p-4 z-10'
            variants={parentItem}
            initial='hidden'
            animate='visible'
          >
            <li className='capitalize text-xl'>Username</li>
            <li className='uppercase text-sm'>Administrator</li>

            {menuItems.map((item, index) => (
              <motion.li key={index} className='childItem' variants={childItem}>
                {index === menuItems.length - 1 && <hr className='mb-2' />}
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
