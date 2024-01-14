import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DropdownItem from './DropdownItem/DropdownItem';
import SearchBar from './SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';
import MapFilter from './MapFilters/Mapfilter';
import UserMenu from './UserMenu/UserMenu';
import { selectUserPlaces } from '../Redux/userPlacesSlice';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const userPlacesData = useSelector(selectUserPlaces);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleLoginModalOpen = () => {
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  };
  const dropdownItems = ['map', 'forum', 'forum'];

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
        className={`relative flex justify-between p-3 ${
          userPlacesData.isOpen && 'w-2/3 float-right'
        }`}
      >
        <div className='flex gap-2 items-center'>
          <div>
            <motion.div
              whileHover={{ scale: 1.1 }}
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
                className='flex flex-col gap-2 mt-2 absolute'
                variants={parentItem}
                initial='hidden'
                animate='visible'
              >
                <Link to='/'>
                  <DropdownItem icon='map_icon' name='Main page'></DropdownItem>
                </Link>
                <Link to='/forum'>
                  <DropdownItem icon='forum_icon' name='Forum'></DropdownItem>
                </Link>
                <DropdownItem
                  icon='forum_icon'
                  name='Login'
                  onClick={handleLoginModalOpen}
                ></DropdownItem>
                {dropdownItems.map((value, index) => (
                  <motion.li key={index} className='childItem' variants={childItem}>
                    <Link to={`/${value}`}>
                      <DropdownItem icon={`${value}_icon`} name={`${value}`}></DropdownItem>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          <SearchBar />
        </div>
        <div className='flex gap-3'>
          <UserMenu />
          <MapFilter />
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
