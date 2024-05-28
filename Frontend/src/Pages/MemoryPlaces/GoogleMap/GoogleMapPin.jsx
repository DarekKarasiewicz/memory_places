import PlusIcon from 'icons/PlusIcon';

const GoogleMapPin = ({ iconPath }) => {
  return (
    <div className='flex items-center justify-center w-10 h-10 bg-mainBgColor rounded-t-full rounded-bl-full rotate-45 shadow-itemShadow'>
      <PlusIcon className='h-8 w-8 rotate-45' />
    </div>
  );
};

export default GoogleMapPin;
