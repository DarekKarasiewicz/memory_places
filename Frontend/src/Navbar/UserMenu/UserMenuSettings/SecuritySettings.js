import { useState, useRef } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseInput from '../../../Base/BaseInput';

function SecuritySettings() {
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleBlurPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleBlurConfPassword = () => {
    setIsValidConfirmPassword(confirmPasswordRef.current.value === passwordRef.current.value);
  };

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Security</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <BaseInput
          type='password'
          label='Password'
          name='password'
          placeholder='Your Password'
          ref={passwordRef}
          onBlur={handleBlurPassword}
        />
        {isValidPassword === false && (
          <ul role='list' className='text-red-500 text-xs'>
            Password must:
            <li>Be at least 8 characters long.</li>
            <li>Contains at least one digit.</li>
          </ul>
        )}
        <BaseInput
          type='password'
          label='Confirm Password'
          name='confPassword'
          placeholder='Confirm Password'
          ref={confirmPasswordRef}
          onBlur={handleBlurConfPassword}
        />
        {isValidConfirmPassword === false && (
          <p className='text-red-500 text-xs'>Password must be similar</p>
        )}
        {isValidPassword && isValidConfirmPassword ? (
          <BaseButton name='Zatwierdź' className='mt-2' />
        ) : (
          <BaseButton name='Zatwierdź' className='mt-2 cursor-not-allowed' disabled={true} />
        )}
      </div>
    </div>
  );
}

export default SecuritySettings;
