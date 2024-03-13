const GoogleMapPin = ({ iconPath }) => {
  return (
    <div className='w-9 h-9 bg-gray-400 rounded-t-full rounded-bl-full rotate-45 border border-black'>
      <img
        className='-rotate-45 w-6 h-6 absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        src={iconPath}
        alt='place_pin_icon'
      />
    </div>
  );
};

export default GoogleMapPin;
