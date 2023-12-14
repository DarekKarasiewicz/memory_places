import { motion } from 'framer-motion';

function BaseButton(props) {
  return (
    <>
      <motion.button
        className='rounded border-2 w-32 border-black text-lg'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={props.onClick}
      >
        {props.name}
      </motion.button>
    </>
  );
}

export default BaseButton;
