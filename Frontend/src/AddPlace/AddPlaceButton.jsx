import { motion } from 'framer-motion';

const AddPlaceButton = (props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={props.openModal}
      className='absolute bottom-4 border-2 border-black left-1/2 bg-slate-300 h-14 w-14 rounded-full cursor-pointer flex justify-center items-center'
    >
      <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-14 w-14'></img>
    </motion.div>
  );
};

export default AddPlaceButton;
