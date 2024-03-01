import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DropdownItem from './DropdownItem/DropdownItem';
import SearchBar from './SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import MapFilter from './MapFilters/Mapfilter';
import UserMenu from './UserMenu/UserMenu';
import { selectUserPlaces } from '../Redux/userPlacesSlice';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const userPlacesData = useSelector(selectUserPlaces);
  const { t } = useTranslation();

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const dropdownItems = [
    { link: '/', icon: 'map_icon', name: t('navbar.main_page') },
    { link: '/forum', icon: 'forum_icon', name: t('navbar.forum') },
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
      <nav
        className={`relative flex justify-between p-2 bg-slate-600 shadow-xl ${
          userPlacesData.isOpen && 'w-2/3 float-right'
        }`}
      >
        <div className='flex gap-2 items-center'>
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300'
              onClick={handleClick}
            >
              <img
                src={`./assets/${!isActive ? 'menu_icon' : 'cancel_icon'}.svg`}
                alt='menu_icon'
                className='h-8 w-8'
              ></img>
            </motion.div>
            {isActive && (
              <motion.ul
                className='flex flex-col gap-2 mt-1 p-2 left-0 absolute bg-slate-600 rounded-b-lg'
                variants={parentItem}
                initial='hidden'
                animate='visible'
              >
                {dropdownItems.map((item, index) => (
                  <motion.li key={index} className='childItem' variants={childItem}>
                    <Link to={`/${item.link}`}>
                      <DropdownItem icon={`${item.icon}`} name={`${item.name}`}></DropdownItem>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          <SearchBar />
        </div>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
          <img
            src='assets/memorial_places_logo.png'
            alt='memory_place_logo'
            className='w-24 h-24 bg-slate-600 rounded-full m-2 shadow-lg'
          ></img>
        </div>
        <div className='flex gap-3 items-center'>
          <UserMenu />
          <MapFilter />
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
