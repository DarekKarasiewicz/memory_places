import { motion } from 'framer-motion';

function BaseButton(props) {
  return (
    <>
      <motion.button
        className={`rounded border-2 w-32 border-black text-lg capitalize ${
          props.className ? props.className : ''
        } ${props.disabled ? 'opacity-50' : ''}`}
        whileHover={!props.disabled ? { scale: 1.1 } : {}}
        whileTap={{ scale: 0.9 }}
        onClick={props.onClick}
        disabled={props.disabled ? props.disabled : false}
      >
        {props.name}
      </motion.button>
    </>
  );
}

export default BaseButton;
