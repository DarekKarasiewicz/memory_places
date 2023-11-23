import { useState } from 'react';
import { motion } from 'framer-motion';

function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  const handleClick = () => {
    if (searchedText.trim().length === 0) {
      setIsActive((current) => !current);
    }
  };

  const handleSearchChange = (e) => {
    setSearchedText(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchedText('');
  };

  const variantsToFade = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className='flex'>
        {isActive && (
          <motion.div
            className='relative flex items-center'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variantsToFade}
          >
            <input
              type='text'
              placeholder='Search...'
              className='rounded-l-lg h-10 w-80 border-black border-t-2 border-l-2 border-b-2 p-3'
              onChange={handleSearchChange}
              value={searchedText}
            ></input>
            <img
              src={`./assets/cancel_icon.svg`}
              alt='menu_icon'
              className='h-5 w-5 absolute right-1 cursor-pointer'
              onClick={clearSearchBar}
            ></img>
          </motion.div>
        )}
        <div
          className={`${
            isActive ? 'rounded-r-lg' : 'rounded-full'
          } border-2 h-10 w-10 border-black flex justify-center items-center bg-slate-300 cursor-pointer z-10 relative`}
          onClick={handleClick}
        >
          <img
            src={`./assets/${
              searchedText.trim().length === 0 && isActive ? 'search_closed_icon' : 'search_icon'
            }.svg`}
            alt={
              searchedText.trim().length === 0 && isActive ? 'search_closed_icon' : 'search_icon'
            }
            className='h-6 w-6'
          ></img>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
