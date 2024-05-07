import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseButton from 'Base/BaseButton';
import BaseSelect from 'Base/BaseSelect';
import { useTranslation } from 'react-i18next';
import LanguageIcon from 'icons/LanguageIcon';

function LanguageSettings() {
  const [selectedLanguageOption, setSelectedLanguageOption] = useState('');
  const [selectedDateFormatOption, setSelectedDateFormatOption] = useState('');
  const { t } = useTranslation();

  const handleSelectLanguageChange = (value) => {
    setSelectedLanguageOption(value);
  };

  const handleSelectDateFormatChange = (value) => {
    setSelectedDateFormatOption(value);
  };

  const lang_options = [
    { label: t('user.pl'), value: 'polish' },
    { label: t('user.en'), value: 'english' },
    { label: t('user.de'), value: 'german' },
    { label: t('user.ru'), value: 'russian' },
  ];

  const date_format_options = [
    { label: t('user.date1'), value: 'date_ymd' },
    { label: t('user.date2'), value: 'date_mdy' },
    { label: t('user.date3'), value: 'date_dmy' },
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
      <div className='border-b-2 border-textColor pr-2 pb-2 pl-2 text-2xl flex gap-2'>
        <LanguageIcon />
        <span>{t('user.language')}</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='pb-2'>
            <BaseSelect
              label={t('user.app_language')}
              name='AppLanguage'
              value={selectedLanguageOption}
              options={lang_options}
              onChange={handleSelectLanguageChange}
            />
          </div>
          <div className='pt-2 border-t-2 border-t-textColor'>
            <BaseSelect
              label={t('user.date_format')}
              name='DateFormat'
              value={selectedDateFormatOption}
              options={date_format_options}
              onChange={handleSelectDateFormatChange}
            />
          </div>
        </div>
        <BaseButton name={t('user.confirm')} btnBg='blue' className='mt-4' />
      </div>
    </motion.div>
  );
}

export default LanguageSettings;
