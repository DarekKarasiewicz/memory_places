import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useFontSize } from './FontSizeContext';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import FontSizeIcon from 'icons/FontSizeIcon';

function FontSizeSwitcher(props) {
  const { fontSize, setFontSize } = useFontSize();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const wrapperRef = useRef(null);

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    setIsOpen(false);
  };

  const font_options = [
    { label: t('user.font1'), value: 'base' },
    { label: t('user.font2'), value: 'big' },
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
            <FontSizeIcon className='h-6 w-6' />
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
                {font_options.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={option.value}
                    onClick={() => handleFontSizeChange(option.value)}
                    className={`${
                      option.value === fontSize ? 'text-contrastColor font-bold ' : ''
                    }hover:text-contrastColor px-4 py-2 flex justify-center items-center gap-2 text-sm text-center cursor-pointer`}
                    role='menuitem'
                  >
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

export default FontSizeSwitcher;
