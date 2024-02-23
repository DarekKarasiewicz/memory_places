import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import i18n from '../i18n';

function LanguageSwitcher() {
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleLanguageChange = (value) => {
    console.log(value);
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

  return (
    <>
      <div className='absolute right-0 my-auto'>
        <div className='relative inline-block'>
          <button
            type='button'
            className='inline-flex gap-2 justify-center items-center  w-full rounded-lg border border-gray-600 bg-gray-300 px-4 py-2 text-sm leading-5 font-medium text-gray-700 shadow-sm hover:text-gray-500 active:bg-gray-50 active:text-gray-800'
            aria-haspopup='true'
            aria-expanded='true'
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={lang_options.find((option) => option.value === language).image}
              alt={lang_options.find((option) => option.value === language).alt}
              className='h-4 w-5 shadow-2xl border-1 border-black'
            />
            {isOpen ? <span>&#11205;</span> : <span>&#11206;</span>}
          </button>

          {isOpen && (
            <div className='origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-gray-300'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {lang_options.map((option) => (
                  <motion.div
                    key={option.value}
                    onClick={() => handleLanguageChange(option.value)}
                    className='block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-200 hover:text-red-600 cursor-pointer'
                    role='menuitem'
                  >
                    <img src={option.image} alt={option.alt} />
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
