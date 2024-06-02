import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectUserPlaces } from 'Redux/userPlacesSlice';

import DropdownItem from './DropdownItem/DropdownItem';
import SearchBar from './SearchBar/SearchBar';
import MapFilter from './MapFilters/Mapfilter';
import UserMenu from './UserMenu/UserMenu';
import MenuIcon from 'icons/MenuIcon';
import CancelIcon from 'icons/CancelIcon';
import ThemeSwitcher from 'Components/ThemeSwitcher/ThemeSwitcher';
import FontSizeSwitcher from 'Components/FontSizeSwitcher/FontSizeSwitcher';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const userPlacesData = useSelector(selectUserPlaces);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();
  const [cookies, removeCookie] = useCookies(['user']);
  const user = cookies.user;

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const dropdownItems = [
    { link: '/', icon: 'map', name: t('navbar.main_page') },
    { link: '/forum', icon: 'forum', name: t('navbar.forum') },
    { link: '/adminDashboard', icon: 'user', name: t('user.admin_panel'), isAdministration: true },
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

  const isAdminOrMaster = user && (user.admin || user.master);

  const filteredMenuItems = dropdownItems.filter((item) => {
    if (item.isAdministration) {
      return isAdminOrMaster;
    }
    return true;
  });

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

  return (
    <>
      <nav
        className={`relative flex justify-between p-2 bg-mainBgColor shadow-xl ${
          userPlacesData.isOpen ? 'w-2/3 float-right' : ''
        }`}
      >
        <div className='flex gap-2 items-center'>
          <div ref={wrapperRef}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='flex justify-center items-center cursor-pointer h-12 w-12'
              onClick={handleClick}
            >
              {isActive ? <CancelIcon className='h-8 w-8' /> : <MenuIcon className='h-8 w-8' />}
            </motion.div>
            {isActive && (
              <motion.ul
                className='flex flex-col gap-2 mt-1 p-2 left-0 absolute bg-mainBgColor rounded-b-lg shadow-shadow-itemShadowWithoutTop'
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
          <SearchBar />
        </div>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 bg-mainBgColor flex justify-center rounded-b-xl shadow-itemShadowBottom'>
          <img
            src='assets/memory_places_logo.png'
            alt='memory_place_logo'
            className='w-22 p-4'
          ></img>
        </div>
        <div className='flex gap-3 items-center'>
          <FontSizeSwitcher />
          <ThemeSwitcher />
          <UserMenu />
          <MapFilter />
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
