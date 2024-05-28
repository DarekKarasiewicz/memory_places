import { useTranslation } from 'react-i18next';

import EyeCloseIcon from 'icons/EyeCloseIcon';
import EyeOpenIcon from 'icons/EyeOpenIcon';

const ShowPassword = ({ isVisible, handlePasswordVisability }) => {
  const { t } = useTranslation();

  return (
    <div className='flex mt-1'>
      {isVisible ? (
        <>
          <div
            className='flex gap-2 cursor-pointer hover:scale-110 transition'
            onClick={handlePasswordVisability}
          >
            <EyeCloseIcon className='h-6 w-6' />
            <span>{t('log_reg_form.hide_pass')}</span>
          </div>
        </>
      ) : (
        <>
          <div
            className='flex gap-2 cursor-pointer hover:scale-110 transition'
            onClick={handlePasswordVisability}
          >
            <EyeOpenIcon className='h-6 w-6' />
            <span>{t('log_reg_form.show_pass')}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPassword;
