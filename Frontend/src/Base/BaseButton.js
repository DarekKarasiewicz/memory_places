import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function BaseButton(props) {
  const [currentBg, setCurrentBg] = useState('');

  useEffect(() => {
    if (props.btnBg === 'blue') {
      setCurrentBg('bg-blue-700');
    } else if (props.btnBg === 'green') {
      setCurrentBg('bg-green-700');
    } else if (props.btnBg === 'red') {
      setCurrentBg('bg-red-700');
    } else {
      setCurrentBg('bg-slate-700');
    }
  }, [props.btnBg]);

  return (
    <>
      <motion.button
        className={`rounded w-32 text-lg capitalize ${currentBg} leading-6 p-2 shadow-xl ${
          props.className ? props.className : ''
        } ${props.disabled ? 'opacity-50' : ''}`}
        whileHover={!props.disabled ? { scale: 1.05 } : {}}
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
