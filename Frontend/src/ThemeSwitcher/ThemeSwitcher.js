import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import ThemeIcon from '../icons/ThemeIcon';

function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

  const handleThemeChange = (value) => {
    toggleTheme(value);
    setIsOpen(false);
  };

  const theme_options = [
    { label: t('user.color1'), value: 'light', indicator: 'bg-white' },
    { label: t('user.color2'), value: 'dark', indicator: 'bg-black' },
    // { label: t('user.color3'), value: 'contrast', indicator: 'bg-yellow-500'}
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <div className='relative z-10 text-textColor'>
        <div className='relative flex items-center' ref={wrapperRef}>
          <button
            type='button'
            className='inline-flex gap-1 justify-center items-center w-full'
            aria-haspopup='true'
            aria-expanded='true'
            onClick={() => setIsOpen(!isOpen)}
          >
            <ThemeIcon className='h-6 w-6' />
            {isOpen ? (
              <ArrowUpIcon className={'h-7 w-7'} />
            ) : (
              <ArrowDownIcon className={'h-7 w-7'} />
            )}
          </button>

          {isOpen && (
            <motion.div
              className='-left-1/2 top-9 bg-mainBgColor flex justify-center items-center absolute mt-2 w-auto shadow-itemShadow rounded-lg'
              variants={parentItem}
              initial='hidden'
              animate='visible'
            >
              <div>
                {theme_options.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`${
                      option.value === theme ? 'text-contrastColor font-bold ' : ''
                    }hover:text-contrastColor px-4 py-2 flex justify-center items-center gap-2 text-sm text-center cursor-pointer`}
                    role='menuitem'
                  >
                    <div
                      className={`h-5 w-5 shadow border shrink-0 ${option.indicator} rounded-full`}
                    ></div>
                    <span>{option.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default ThemeSwitcher;
