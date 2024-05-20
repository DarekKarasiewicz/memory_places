import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SearchIcon from 'icons/SearchIcon';
import CancelIcon from 'icons/CancelIcon';

function SearchBar() {
  const inputRef = useRef(null);
  const [searchedText, setSearchedText] = useState('');
  const { t } = useTranslation();

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
      <div className='flex gap-2'>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='h-10 w-10 flex justify-center items-center cursor-pointer z-5 relative'
        >
          <SearchIcon className='h-6 w-6' />
        </motion.div>
        <motion.div
          className='relative flex items-center'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={variantsToFade}
        >
          <input
            type='text'
            placeholder={t('common.search')}
            className='h-10 w-96 shadow-itemShadow rounded-lg pl-3 py-3 pr-9 focus:outline-contrastColor text-black'
            onChange={handleSearchChange}
            ref={inputRef}
            value={searchedText}
          ></input>
          <CancelIcon
            className='h-5 w-5 absolute right-2 cursor-pointer'
            onClick={clearSearchBar}
          />
        </motion.div>
      </div>
    </>
  );
}

export default SearchBar;
