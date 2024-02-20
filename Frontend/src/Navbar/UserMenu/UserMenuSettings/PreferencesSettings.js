import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';
import { useTranslation } from 'react-i18next';

function PreferencesSettings() {
  const [selectedFontOption, setSelectedFontOption] = useState('');
  const [selectedFontSizeOption, setSelectedFontSizeOption] = useState('');
  const [selectedAppThemeOption, setSelectedAppThemeOption] = useState('');
  const { t } = useTranslation();

  const handleSelectFontChange = (value) => {
    setSelectedFontOption(value);
  };

  const handleSelectFontSizeChange = (value) => {
    setSelectedFontSizeOption(value);
  };

  const handleSelectAppThemeChange = (value) => {
    setSelectedAppThemeOption(value);
  };
  const font_options = [
    { label: 'Arial', value: 'arial' },
    { label: 'Calibri', value: 'calibri' },
    { label: 'Tahoma', value: 'tahoma' },
    { label: 'Times New Roman', value: 'times_new_roman' },
    { label: 'Verdana', value: 'verdana' },
  ];
  {
    /* Add maybe options for specific numbers like 12px, 14px, 16px, etc ... */
  }
  const font_size_options = [
    { label: t('user.font1'), value: 'big' },
    { label: t('user.font2'), value: 'medium' },
    { label: t('user.font3'), value: 'small' },
  ];

  {
    /* contrast theme(#1 - black background + white font,#2 - black background + yellow font,#3 - yellow background + black font)*/
  }
  const app_theme_options = [
    { label: t('user.color1'), value: 'light' },
    { label: t('user.color2'), value: 'dark' },
    { label: t('user.color3'), value: 'contrast1' },
    { label: t('user.color4'), value: 'contrast2' },
    { label: t('user.color5'), value: 'contrast3' },
  ];

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>{t('user.preferences')}</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          {t('user.font')}
          <BaseSelect
            name='NotifyLevel'
            value={selectedFontOption}
            options={font_options}
            onChange={handleSelectFontChange}
          />
          {t('user.font_size')}
          <BaseSelect
            name='NotifyLevel'
            value={selectedFontSizeOption}
            options={font_size_options}
            onChange={handleSelectFontSizeChange}
          />
          {t('user.app_theme')}
          <BaseSelect
            name='NotifyLevel'
            value={selectedAppThemeOption}
            options={app_theme_options}
            onChange={handleSelectAppThemeChange}
          />
        </div>
        <BaseButton name={t('user.confirm')} className='mt-2' />
      </div>
    </div>
  );
}

export default PreferencesSettings;
