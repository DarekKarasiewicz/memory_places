import { useState, useEffect } from 'react';
import moment from 'moment';
import LanguageSwitcher from 'LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from 'ThemeSwitcher/ThemeSwitcher';
import AdminDropdown from './AdminDropdown/AdminDropdown';
import SearchBar from './SearchBar';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import i18n from 'i18n';
import 'moment/locale/pl';
import 'moment/locale/ru';
import 'moment/locale/de';

function ContentNavbar({ showLogo }) {
  const [cookies, removeCookie] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    moment.locale(lang);
  }, [lang]);

  useEffect(() => {
    const updateLanguage = () => {
      setLang(i18n.language);
    };

    i18n.on('languageChanged', updateLanguage);
  }, []);

  return (
    <>
      <div className='flex justify-between items-center w-full p-4 shadow-lg bg-mainBgColor text-textColor h-20'>
        <div></div>
        <SearchBar />
        <div className='flex'>
          <div className='p-2 pr-4 border-r-2'>
            <div className='flex justify-end items-center gap-8'>
              <LanguageSwitcher variant='admin_dashboard' />
              <ThemeSwitcher />
            </div>
          </div>
          <AdminDropdown />
        </div>
      </div>
    </>
  );
}

export default ContentNavbar;
