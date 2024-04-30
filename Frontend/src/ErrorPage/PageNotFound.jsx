import { Link } from 'react-router-dom';
import BaseButton from '../Base/BaseButton';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-mainBgColor text-textColor flex justify-center items-center w-screen h-screen font-sans'>
      <div className='flex flex-col items-center gap-6 -mt-20'>
        <p className='text-[250px] font-bold'>404</p>
        <p className='text-6xl -mt-20'>{t('user.error404_title')}</p>
        <p className='text-2xl mt-4 mb-2'>{t('user.error404_info')}</p>
        <Link to='/' className='flex justify-center items-center'>
          <BaseButton name={t('user.back_to_main_page')} btnBg='red' breakWidth={true} />
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
