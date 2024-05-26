import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import LanguageSwitcher from 'LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from 'ThemeSwitcher/ThemeSwitcher';
import AdminDropdown from './AdminDropdown/AdminDropdown';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';
import CancelIcon from 'icons/CancelIcon';
import MenuIcon from 'icons/MenuIcon';
import { Link } from 'react-router-dom';
import DropdownItem from 'Navbar/DropdownItem/DropdownItem';
import i18n from 'i18n';
import 'moment/locale/pl';
import 'moment/locale/ru';
import 'moment/locale/de';

function ContentNavbar({ showLogo }) {
  const [isActive, setIsActive] = useState(false);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const wrapperRef = useRef(null);

  const dropdownItems = [
    { link: '/', icon: 'map', name: t('navbar.main_page') },
    { link: '/forum', icon: 'forum', name: t('navbar.forum') },
    { link: '/adminDashboard', icon: 'user', name: t('user.admin_panel'), isAdministration: true },
  ];

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const isAdminOrMaster = user && (user.admin || user.master);

  const filteredMenuItems = dropdownItems.filter((item) => {
    if (item.isAdministration) {
      return isAdminOrMaster;
    }
    return true;
  });

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
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    moment.locale(lang);
  }, [lang]);

  useEffect(() => {
    const updateLanguage = () => {
      setLang(i18n.language);
    };

    i18n.on('languageChanged', updateLanguage);
  }, []);

  return (
    <>
      <div className='flex justify-between items-center w-full p-4 shadow-lg bg-mainBgColor text-textColor h-20'>
        <div ref={wrapperRef} className='relative'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='flex justify-center items-center cursor-pointer h-12 w-12'
            onClick={handleClick}
          >
            {isActive ? <CancelIcon className='h-8 w-8' /> : <MenuIcon className='h-8 w-8' />}
          </motion.div>
          {isActive && (
            <motion.ul
              className='flex flex-col gap-2 mt-4 p-2 -left-2 absolute bg-mainBgColor rounded-b-lg shadow-itemShadowWithoutTop'
              variants={parentItem}
              initial='hidden'
              animate='visible'
            >
              {filteredMenuItems.map((item, index) => (
                <motion.li key={index} className='childItem' variants={childItem}>
                  <Link to={`${item.link}`}>
                    <DropdownItem icon={`${item.icon}`} name={`${item.name}`}></DropdownItem>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
        <div className='flex'>
          <div className='flex justify-between items-center py-2 pr-4 border-r-2'>
            <div className='flex justify-end items-center gap-6'>
              <LanguageSwitcher variant='admin_dashboard' />
              <ThemeSwitcher />
            </div>
          </div>
          <AdminDropdown />
        </div>
      </div>
    </>
  );
}

export default ContentNavbar;
