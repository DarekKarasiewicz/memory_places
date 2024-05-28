import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SearchIcon from 'icons/SearchIcon';
import CancelIcon from 'icons/CancelIcon';

function SearchBar({ onSearchClick }) {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const clearSearchBar = () => {
    inputRef.current.value = '';
  };

  const variantsToFade = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className='px-6 py-10 bg-thirdBgColor rounded-xl flex justify-center'>
        <div className='flex gap-2 w-3/4'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='h-10 w-10 flex justify-center items-center cursor-pointer z-5 relative'
            onClick={() => onSearchClick(inputRef.current.value)}
          >
            <SearchIcon className='h-6 w-6' />
          </motion.div>
          <motion.div
            className='relative flex items-center w-full'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variantsToFade}
          >
            <input
              type='text'
              placeholder={t('common.search')}
              className='h-10 w-full shadow-itemShadow rounded-lg pl-3 py-3 pr-9 focus:outline-contrastColor text-black'
              ref={inputRef}
            />
            <CancelIcon
              className='h-5 w-5 absolute right-2 cursor-pointer'
              color='#000000'
              onClick={clearSearchBar}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
