import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import BaseButton from '../../../Base/BaseButton';
import BaseInput from '../../../Base/BaseInput';

function AccountSettings() {
  const [isValidName, setIsValidName] = useState(null);
  const [isValidSurname, setIsValidSurname] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [userData, setUserData] = useState([]);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);

      if (nameRef.current) nameRef.current.value = decodedToken.username;
      if (surnameRef.current) surnameRef.current.value = decodedToken.username;
      if (emailRef.current) emailRef.current.value = decodedToken.email;
    }
  }, []);

  const handleBlurName = () => {
    const nameRegex = /^[A-Za-z]+$/;
    setIsValidName(nameRegex.test(nameRef.current.value));
  };

  const handleBlurSurnName = () => {
    const surnameRegex = /^[A-Za-z]+$/;
    setIsValidSurname(surnameRegex.test(surnameRef.current.value));
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const checkIsNotSameData = () => {
    if (
      userData.username === nameRef.current.value &&
      userData.username === surnameRef.current.value &&
      userData.email === emailRef.current.value
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (checkIsNotSameData() === false) {
      // HERE will be axios request to change data
      console.log('account data changed!');
    }
  };

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Account</div>
      <div className='flex gap-4 h-14 items-center my-4'>
        <div className='relative'>
          <img
            className='rounded-full w-14 h-14 p-1 border-black border-2'
            src='./assets/user_icon.svg'
            alt='user_square_icon'
          ></img>
          {/* In future on click possibility to change user avatar */}
          <motion.img
            whileHover={{ backgroundColor: '#FF0000' }}
            className='absolute -bottom-2 -right-2 h-8 p-1 bg-slate-300 border-black border rounded-full cursor-pointer'
            src='./assets/edit_icon.svg'
            alt='edit_icon'
          ></motion.img>
        </div>

        <div className='flex flex-col leading-5'>
          <span className='text-lg'>{userData.username}</span>
          <span className='text-sm uppercase'>{userData.admin ? 'admin' : 'user'}</span>
        </div>
      </div>
      <div className='border-black border-t-2 py-2 gap-2 flex flex-col items-center'>
        <BaseInput
          type='text'
          placeholder='Name'
          name='nameInput'
          label='Name'
          ref={nameRef}
          onBlur={handleBlurName}
        ></BaseInput>
        {isValidName === false && <p className='text-red-500 text-xs'>Name is incorrect!</p>}
        <BaseInput
          type='text'
          placeholder='Surname'
          name='surnameInput'
          label='Surname'
          ref={surnameRef}
          onBlur={handleBlurSurnName}
        ></BaseInput>
        {isValidSurname === false && <p className='text-red-500 text-xs'>Surname is incorrect!</p>}
        <BaseInput
          type='text'
          placeholder='Email'
          name='emailInput'
          label='Email'
          ref={emailRef}
          onBlur={handleBlurEmail}
        ></BaseInput>
        {isValidEmail === false && <p className='text-red-500 text-xs'>Email is incorrect!</p>}
        {isValidName || isValidSurname || isValidEmail ? (
          <BaseButton name='Zatwierdź' className='mt-2' onClick={handleSumbit} />
        ) : (
          <BaseButton name='Zatwierdź' className='mt-2 cursor-not-allowed' disabled={true} />
        )}
      </div>
    </div>
  );
}

export default AccountSettings;
