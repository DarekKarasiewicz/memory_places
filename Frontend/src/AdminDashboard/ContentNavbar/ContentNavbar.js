import { useState, useEffect } from 'react';
import moment from 'moment';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import AdminDropdown from './AdminDropdown/AdminDropdown';
import i18n from '../../i18n';
import 'moment/locale/pl';
import 'moment/locale/ru';
import 'moment/locale/de';

function ContentNavbar() {
  const [lang, setLang] = useState(i18n.language);
  const [date, setDate] = useState(false);

  useEffect(() => {
    moment.locale(lang);
    const currentDate = moment();
    const dateString = currentDate.format('dddd D MMMM YYYY');

    setDate(dateString);
  }, [lang]);

  useEffect(() => {
    const updateLanguage = () => {
      setLang(i18n.language);
    };

    i18n.on('languageChanged', updateLanguage);
  }, []);

  return (
    <>
      <div className='flex justify-between w-full p-4 shadow-lg'>
        <div className='text-3xl ml-4'>Welcome, user!</div>
        <div className='flex'>
          <div className='p-2 pr-4 border-r-2'>
            <div className='flex justify-end items-center gap-8'>
              <span className='capitalize'>{date}</span>
              <LanguageSwitcher variant='admin_dashboard' />
            </div>
          </div>
          <AdminDropdown />
        </div>
      </div>
    </>
  );
}

export default ContentNavbar;
