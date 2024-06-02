import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import BaseSelect from 'Components/Base/BaseSelect';
import PreferencesIcon from 'icons/PreferencesIcon';

import i18n from 'i18n';
import { useTheme } from 'Components/ThemeSwitcher/ThemeContext';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function PreferencesSettings() {
  const [selectedFontSizeOption, setSelectedFontSizeOption] = useState('');
  const languageRef = useRef();
  const themeRef = useRef();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { fontSize } = useFontSize();

  useEffect(() => {
    languageRef.current.value = i18n.language;
    themeRef.current.value = theme;
  }, []);

  const handleSelectFontSizeChange = (value) => {
    setSelectedFontSizeOption(value);
  };

  const lang_options = [
    { label: t('user.pl'), value: 'pl' },
    { label: t('user.en'), value: 'en' },
    { label: t('user.de'), value: 'de' },
    { label: t('user.ru'), value: 'ru' },
  ];

  {
    /* contrast theme(#1 - black background + white font,#2 - black background + yellow font,#3 - yellow background + black font)*/
  }
  const app_theme_options = [
    { label: t('user.color1'), value: 'light' },
    { label: t('user.color2'), value: 'dark' },
    // { label: t('user.color3'), value: 'contrast1' },
  ];

  const font_size_options = [
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

  return (
    <motion.div variants={parentItem} initial='hidden' animate='visible'>
      <div className='flex items-center gap-2 border-b-2 border-textColor px-2 pb-2'>
        <PreferencesIcon />
        <span className={`text-${fontSize}-2xl`}>{t('user.preferences')}</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-4'>
        <div className='flex flex-col items-center gap-4 w-1/2'>
          <BaseSelect
            label={t('user.app_language')}
            name='AppLanguage'
            ref={languageRef}
            options={lang_options}
            onChange={() => i18n.changeLanguage(languageRef.current.value)}
          />
          <BaseSelect
            label={t('user.app_theme')}
            name='ThemeSwitcher'
            ref={themeRef}
            options={app_theme_options}
            onChange={() => toggleTheme(themeRef.current.value)}
          />
          <BaseSelect
            label={t('user.font_size')}
            name='FontSize'
            value={selectedFontSizeOption}
            options={font_size_options}
            onChange={handleSelectFontSizeChange}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default PreferencesSettings;
