import { useTranslation } from 'react-i18next';

const Infobar = () => {
  const { t } = useTranslation();

  return (
    <div className='absolute bg-slate-400 p-3 top-5 left-1/2 transform -translate-x-1/2 rounded-lg '>
      {t('navbar.click_to_select')}
    </div>
  );
};

export default Infobar;
