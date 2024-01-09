import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';

function PreferencesSettings() {
  const [selectedFontOption, setSelectedFontOption] = useState('');
  const [selectedFontSizeOption, setSelectedFontSizeOption] = useState('');
  const [selectedAppThemeOption, setSelectedAppThemeOption] = useState('');

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
    { label: 'Big', value: 'Big' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
  ];

  {
    /* contrast theme(#1 - black background + white font,#2 - black background + yellow font,#3 - yellow background + black font)*/
  }
  const app_theme_options = [
    { label: 'Light version', value: 'light' },
    { label: 'Dark version', value: 'dark' },
    { label: 'Contrast #1', value: 'contrast1' },
    { label: 'Contrast #2', value: 'contrast2' },
    { label: 'Contrast #3', value: 'contrast3' },
  ];

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Notifications</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          Font:
          <BaseSelect
            name='NotifyLevel'
            value={selectedFontOption}
            options={font_options}
            onChange={handleSelectFontChange}
          />
          Font size:
          <BaseSelect
            name='NotifyLevel'
            value={selectedFontSizeOption}
            options={font_size_options}
            onChange={handleSelectFontSizeChange}
          />
          App theme:
          <BaseSelect
            name='NotifyLevel'
            value={selectedAppThemeOption}
            options={app_theme_options}
            onChange={handleSelectAppThemeChange}
          />
        </div>
        <BaseButton name='Zatwierdź' className='mt-2' />
      </div>
    </div>
  );
}

export default PreferencesSettings;
