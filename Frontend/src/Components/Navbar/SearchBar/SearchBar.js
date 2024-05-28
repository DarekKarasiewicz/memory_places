import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { setKey, fromAddress } from 'react-geocode';
import { locationActions } from 'Redux/locationSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SearchIcon from 'icons/SearchIcon';
import SearchClosedIcon from 'icons/SearchClosedIcon';
import CancelIcon from 'icons/CancelIcon';

import './AutocompleteStyles.css';

function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const { t } = useTranslation();
  setKey(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    if (searchedText.length !== 0) {
      const delayDebounceFn = setTimeout(() => {
        fromAddress(searchedText)
          .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            dispatch(locationActions.changeLocation({ lat, lng }));
          })
          .catch(console.error);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchedText, dispatch]);

  const onPlaceChanged = (place) => {
    if (place) {
      setSearchedText(place.formatted_address || place.name);
    }

    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

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
              placeholder={t('common.search')}
              className='h-10 w-80 shadow-itemShadow rounded-lg pl-3 py-3 pr-6 focus:outline-contrastColor'
              onChange={handleSearchChange}
              ref={inputRef}
              value={searchedText}
            ></input>
            <CancelIcon
              className='h-5 w-5 absolute right-1 cursor-pointer'
              onClick={clearSearchBar}
            />
          </motion.div>
        )}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='h-10 w-10 flex justify-center items-center cursor-pointer z-5 relative'
          onClick={handleClick}
        >
          {searchedText.trim().length === 0 && isActive ? (
            <SearchClosedIcon className='h-6 w-6' />
          ) : (
            <SearchIcon className='h-6 w-6' />
          )}
        </motion.div>
      </div>
    </>
  );
}

export default SearchBar;
