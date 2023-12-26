import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DropdownItem from './DropdownItem/DropdownItem';
import SearchBar from './SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleLoginModalOpen =()=>{
    dispatch(modalsActions.changeIsLoginAndRegisterOpen());
  }

  return (
    <>
      <nav className='absolute top-4 left-4 flex gap-2 items-center'>
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
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex flex-col gap-2 mt-2 absolute'
            >
              <Link to='/'>
                <DropdownItem icon='map_icon' name='Main page'></DropdownItem>
              </Link>
              <Link to='/forum'>
                <DropdownItem icon='forum_icon' name='Forum'></DropdownItem>
              </Link>
              <DropdownItem icon='forum_icon' name='Login' onClick={handleLoginModalOpen}></DropdownItem>
            </motion.div>
          )}
        </div>
        <SearchBar />
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
