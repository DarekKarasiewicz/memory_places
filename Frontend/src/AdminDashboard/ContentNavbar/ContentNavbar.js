import { useState, useEffect } from 'react';
import moment from 'moment';
import LanguageSwitcher from 'LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from 'ThemeSwitcher/ThemeSwitcher';
import AdminDropdown from './AdminDropdown/AdminDropdown';
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
      <div className='flex justify-between items-center w-full p-4 shadow-lg bg-mainBgColor text-textColor h-20'>
        {showLogo ? (
          <div className='flex items-center gap-3 ml-4'>
            <section className='w-8 h-8 flex justify-center items-center'>
              <img src='../../assets/memory_places_logo.png' alt='memorial place logo'></img>
            </section>
            <div className='text-3xl ml-4'>
              {t('admin.common.welcome', { user: user.username })}
            </div>
          </div>
        ) : (
          <div className='text-3xl ml-4'>{t('admin.common.welcome', { user: user.username })}</div>
        )}

        <div className='flex'>
          <div className='p-2 pr-4 border-r-2'>
            <div className='flex justify-end items-center gap-8'>
              <span className='capitalize font-semibold'>{date}</span>
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
