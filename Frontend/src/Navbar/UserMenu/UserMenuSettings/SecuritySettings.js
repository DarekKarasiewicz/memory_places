import { useState, useRef } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseInput from '../../../Base/BaseInput';
import { useTranslation } from 'react-i18next';

function SecuritySettings() {
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { t } = useTranslation();

  const handleBlurPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleBlurConfirmPassword = () => {
    setIsValidConfirmPassword(confirmPasswordRef.current.value === passwordRef.current.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    // Before axios request should check if password is not the same as previous one
    // HERE will be axios request to change data
    // console.log('account password changed!');
  };

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>{t('user.security')}</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <BaseInput
          type='password'
          label={t('common.pass')}
          name='password'
          placeholder={t('log_reg_form.your_password')}
          ref={passwordRef}
          onBlur={handleBlurPassword}
        />
        {isValidPassword === false && (
          <ul role='list' className='text-red-500 text-xs'>
            {t('log_reg_form.pass_title')}
            <li>{t('log_reg_form.pass_info1')}</li>
            <li>{t('log_reg_form.pass_info2')}</li>
            <li>{t('log_reg_form.pass_info3')}</li>
          </ul>
        )}
        <BaseInput
          type='password'
          label={t('log_reg_form.confirm_pass')}
          name='confPassword'
          placeholder={t('log_reg_form.confirm_pass')}
          ref={confirmPasswordRef}
          onBlur={handleBlurConfirmPassword}
        />
        {isValidConfirmPassword === false && (
          <p className='text-red-500 text-xs'>{t('log_reg_form.pass_similar')}</p>
        )}
        {isValidPassword && isValidConfirmPassword ? (
          <BaseButton name={t('common.confirm')} className='mt-2' btnBg='blue' onClick={handleSumbit} />
        ) : (
          <BaseButton
            name={t('common.confirm')}
            className='mt-2 cursor-not-allowed'
            btnBg='blue'
            disabled={true}
          />
        )}
      </div>
    </div>
  );
}

export default SecuritySettings;
