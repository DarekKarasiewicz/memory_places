import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

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
      <div className='relative z-10'>
        <div className='relative inline-block' ref={wrapperRef}>
          <button
            type='button'
            className=' inline-flex gap-1 justify-center items-center w-full'
            aria-haspopup='true'
            aria-expanded='true'
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className='h-6 w-6' src='./assets/theme_icon.svg' alt='theme icon'></img>
            {isOpen ? (
              <img className='h-6 w-6' src='./assets/arrow_up_icon.svg' alt='up arrow icon'></img>
            ) : (
              <img
                className='h-6 w-6'
                src='./assets/arrow_down_icon.svg'
                alt='down arrow icon'
              ></img>
            )}
          </button>

          {isOpen && (
            <div className='left-1/2 -translate-x-1/2 bg-white flex justify-center items-center absolute mt-2 w-auto shadow-lg'>
              <div
                className='py-1 origin-top'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {theme_options.map((option) => (
                  <motion.div
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`${
                      option.value === theme ? 'bg-slate-200 text-cyan-600 font-bold ' : ''
                    }hover:bg-slate-200 hover:text-cyan-600 hover:font-bold px-4 py-2 flex justify-center items-center gap-2 text-sm text-center cursor-pointer`}
                    role='menuitem'
                  >
                    <div className={`h-4 w-6 shadow border ${option.indicator} rounded-lg`}></div>
                    <span>{option.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ThemeSwitcher;
