import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';
import { useTranslation } from 'react-i18next';

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

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>{t('user.language')}</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <div className='pb-2'>
            <BaseSelect
              label={t('user.app_language')}
              name='AppLanguage'
              value={selectedLanguageOption}
              options={lang_options}
              onChange={handleSelectLanguageChange}
            />
          </div>
          <div className='pt-2 border-t-2 border-t-black'>
            <BaseSelect
              label={t('user.date_format')}
              name='DateFormat'
              value={selectedDateFormatOption}
              options={date_format_options}
              onChange={handleSelectDateFormatChange}
            />
          </div>
        </div>
        <BaseButton name={t('user.confirm')} btnBg='blue' className='mt-2' />
      </div>
    </div>
  );
}

export default LanguageSettings;
