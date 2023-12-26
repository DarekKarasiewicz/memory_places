import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { setKey, fromAddress } from 'react-geocode';
import { locationActions } from '../../Redux/locationSlice';
import { useDispatch } from 'react-redux';
import './AutocompleteStyles.css';

function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [searchedText, setSearchedText] = useState('');
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
              placeholder='Search...'
              className='rounded-l-lg h-10 w-80 border-black border-t-2 border-l-2 border-b-2 pl-3 pt-3 pb-3 pr-6'
              onChange={handleSearchChange}
              ref={inputRef}
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
          } border-2 h-10 w-10 border-black flex justify-center items-center bg-slate-300 cursor-pointer z-5 relative`}
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
