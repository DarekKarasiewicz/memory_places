import { useTranslation } from 'react-i18next';

const ShowPassword = ({ isVisible, handlePasswordVisability }) => {
  const { t } = useTranslation();

  return (
    <div className='flex mt-1'>
      {isVisible ? (
        <>
          <div className='flex cursor-pointer hover:scale-110 ' onClick={handlePasswordVisability}>
            <img
              src='./assets/eye_close_icon.svg'
              alt='eye_close_icon'
              className='h-6 w-6 cursor-pointer'
            />
            <span>{t('log_reg_form.hide_pass')}</span>
          </div>
        </>
      ) : (
        <>
          <div className='flex cursor-pointer hover:scale-110' onClick={handlePasswordVisability}>
            <img
              onClick={handlePasswordVisability}
              src='./assets/eye_open_icon.svg'
              alt='eye_open_icon'
              className='h-6 w-6 cursor-pointer'
            />
            <span>{t('log_reg_form.show_pass')}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPassword;
