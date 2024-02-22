import { Link, useParams } from 'react-router-dom';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VerifiactionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // decode id here

    axios
      .put(`http://localhost:8000/memo_places/user_verifi/${id}/`)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        alert(`Something went wrong.\nError message: ${error.message}`);
      });
  }, []);

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='bg-slate-300 p-10 rounded-lg'>
          <p className='text-3xl mb-3'>Your account has been verified</p>
          <p className='text-lg mb-2'>Now you can enjoy the full experience of Memorial Places</p>
          <Link to='/' className='flex justify-center items-center'>
            <BaseButton name='Go back to main page' className={'w-56'} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifiactionPage;
