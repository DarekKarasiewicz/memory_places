const AddPlaceButton = (props) => {
  return (
    <div onClick={props.openModal} className='absolute bottom-4 border-2 border-black left-1/2 bg-white hover:bg-slate-200 h-16 w-16 rounded-full cursor-pointer flex justify-center items-center'>
      <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-14 w-14'></img>
    </div>
  );
};

export default AddPlaceButton;
