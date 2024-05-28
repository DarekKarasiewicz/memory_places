import { useTranslation } from 'react-i18next';

const Infobar = () => {
  const { t } = useTranslation();

  return (
    <div className='absolute bg-mainBgColor text-textColor px-6 py-3 top-5 text-xl font-bold left-1/2 transform -translate-x-1/2 rounded-lg shadow-itemShadow'>
      {t('navbar.click_to_select')}
    </div>
  );
};

export default Infobar;
