function Loader() {
  return (
    <>
      <div className='absolute flex w-full h-screen z-40'>
        <div className='m-auto h-auto'>
          <div className='border-gray-300 h-24 w-24 animate-spin rounded-full border-8 border-t-black' />
        </div>
      </div>
    </>
  );
}

export default Loader;
