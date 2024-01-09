import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';

function LanguageSettings() {
  const [selectedLanguageOption, setSelectedLanguageOption] = useState('');
  const [selectedDateFormatOption, setSelectedDateFormatOption] = useState('');

  const handleSelectLanguageChange = (name, value) => {
    setSelectedLanguageOption(value);
  };

  const handleSelectDateFormatChange = (name, value) => {
    setSelectedDateFormatOption(value);
  };

  const lang_options = [
    { label: 'Polish', value: 'polish' },
    { label: 'English', value: 'english' },
    { label: 'Deutsch', value: 'german' },
  ];

  const date_format_options = [
    { label: 'YYYY-MM-DD', value: 'date_ymd' },
    { label: 'MM-DD-YYYY', value: 'date_mdy' },
    { label: 'DD-MM-YYYY', value: 'date_dmy' },
  ];

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Language</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <div className='pb-2'>
            Application language:
            <BaseSelect
              name='AppLanguage'
              value={selectedLanguageOption}
              options={lang_options}
              onChange={handleSelectLanguageChange}
            />
          </div>
          <div className='pt-2 border-t-2 border-t-black'>
            Date format:
            <BaseSelect
              name='DateFormat'
              value={selectedDateFormatOption}
              options={date_format_options}
              onChange={handleSelectDateFormatChange}
            />
          </div>
        </div>
        <BaseButton name='Zatwierdź' className='mt-2' />
      </div>
    </div>
  );
}

export default LanguageSettings;
