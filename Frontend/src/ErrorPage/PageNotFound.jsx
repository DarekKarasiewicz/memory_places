import { Link } from 'react-router-dom';
import BaseButton from '../Base/BaseButton';

const PageNotFound = () => {
  return (
    <div
      className='flex justify-center items-center w-screen h-screen bg-center bg-cover'
      style={{ backgroundImage: "url('assets/bg-image-404.png')" }}
    >
      <div className='bg-slate-300 p-10 rounded-lg'>
        <p className='text-3xl mb-3'>404 Page Not Found</p>
        <p className='text-lg mb-2'>It seems you are looking for page that doesn&apos;t exist.</p>
        <Link to='/' className='flex justify-center items-center'>
          <BaseButton name='Go back to main page' className={'w-56'} />
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
