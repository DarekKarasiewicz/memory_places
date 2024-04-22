import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import i18n from '../i18n';
import ArrowUpIcon from '../icons/admin/ArrowUpIcon';
import ArrowDownIcon from '../icons/admin/ArrowDownIcon';

function LanguageSwitcher(props) {
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

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
            ? 'absolute right-0 top-20 my-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
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
              className='h-4 w-5 drop-shadow-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
            />
            {isOpen ? (
              <ArrowUpIcon className={'h-7 w-7'} />
            ) : (
              <ArrowDownIcon className={'h-7 w-7'} />
            )}
          </button>

          {isOpen && (
            <div
              className={`${
                props.variant !== 'admin_dashboard'
                  ? 'right-2 rounded-lg bg-mainBgColor'
                  : 'left-1/2 -translate-x-1/2 bg-thirdBgColor flex justify-center items-center'
              } absolute mt-2 w-24 shadow-lg`}
            >
              <div
                className='py-2 origin-top'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {lang_options.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={option.value}
                    onClick={() => handleLanguageChange(option.value)}
                    className={`${
                      props.variant !== 'admin_dashboard'
                        ? 'text-textColor hover:text-contrastColor'
                        : 'hover:bg-secondaryBgColor hover:text-contrastColor'
                    } block hover:font-bold px-4 py-2 text-sm text-center cursor-pointer `}
                    role='menuitem'
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className='drop-shadow-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
                    />
                    {option.label}
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

export default LanguageSwitcher;
