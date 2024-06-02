import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import ArrowUpIcon from 'icons/ArrowUpIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';

import i18n from 'i18n';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function LanguageSwitcher(props) {
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const wrapperRef = useRef(null);
  const { fontSize } = useFontSize();

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    setIsOpen(false);
  };

  const lang_options = [
    { label: t('user.pl'), value: 'pl', image: '../../assets/flags/pl.png', alt: t('user.pl') },
    { label: t('user.en'), value: 'en', image: '../../assets/flags/en.png', alt: t('user.en') },
    { label: t('user.de'), value: 'de', image: '../../assets/flags/de.png', alt: t('user.de') },
    { label: t('user.ru'), value: 'ru', image: '../../assets/flags/ru.png', alt: t('user.ru') },
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
      <div
        className={`${
          props.variant !== 'admin_dashboard'
            ? 'absolute right-0 top-20 my-auto shadow-itemShadow'
            : 'relative z-10'
        }`}
        ref={wrapperRef}
      >
        <div className='relative inline-block'>
          <button
            type='button'
            className={`${
              props.variant !== 'admin_dashboard'
                ? 'rounded-l-lg bg-mainBgColor pl-4 pr-1 py-3 active:bg-slate-50'
                : ''
            } inline-flex gap-1 justify-center items-center w-full`}
            aria-haspopup='true'
            aria-expanded='true'
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={lang_options.find((option) => option.value === language).image}
              alt={lang_options.find((option) => option.value === language).alt}
              className='h-4 w-5 shadow-itemShadow'
            />
            {isOpen ? (
              <ArrowUpIcon className={'h-7 w-7'} />
            ) : (
              <ArrowDownIcon className={'h-7 w-7'} />
            )}
          </button>

          {isOpen && (
            <motion.div
              className={`${
                props.variant !== 'admin_dashboard'
                  ? 'right-2 rounded-lg bg-mainBgColor'
                  : '-left-1/2 bg-mainBgColor flex justify-center items-center rounded-lg'
              } absolute mt-2 w-24 shadow-itemShadow`}
              variants={parentItem}
              initial='hidden'
              animate='visible'
            >
              <div
                className='py-2'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {lang_options.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={option.value}
                    onClick={() => handleLanguageChange(option.value)}
                    className={`flex flex-col items-center hover:font-bold px-4 py-2 text-sm text-center cursor-pointer hover:text-contrastColor ${
                      language === option.value ? 'text-contrastColor font-bold' : 'text-textColor'
                    }`}
                    role='menuitem'
                  >
                    <img src={option.image} alt={option.alt} className='shadow-itemShadow' />
                    <span className={`text-${fontSize}-sm`}>{option.label}</span>
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

export default LanguageSwitcher;
