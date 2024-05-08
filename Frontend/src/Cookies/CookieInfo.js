import BaseButton from 'Base/BaseButton';
import CookieIcon from 'icons/CookieIcon';

function CookiesInfo(props) {
  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-40'>
        <div className='m-auto min-w-sm max-w-lg rounded-[24px] border-2 border-black h-auto p-4 bg-white relative break-all'>
          <div className='flex justify-between items-center h-10 pb-4 border-gray-300 border-b-2'>
            <div className='flex justify-center items-center gap-2 text-xl'>
              <span className='capitalize font-medium'>Want a cookie?</span>
              <CookieIcon className='h-8 w-8' />
            </div>
          </div>
          <div className='pt-4 mb-5 text-center'>
            <span className='text-lg break-keep'>
              We use cookies to personalize our website and offerings to your interests and for
              measurement and analytics purposes. By using our website and our products, you agree
              to our use of cookies.
            </span>
          </div>
          <div className='flex justify-center gap-2 mb-3'>
            <BaseButton name='Required only' btnBg='blue' onClick={props.closeModal}></BaseButton>
            <BaseButton name='Accept all' btnBg='blue' onClick={props.closeModal}></BaseButton>
          </div>
          <div className='flex justify-center'>
            <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookiesInfo;
