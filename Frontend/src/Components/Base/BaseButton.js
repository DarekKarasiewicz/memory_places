import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function BaseButton(props) {
  const [currentBg, setCurrentBg] = useState('');
  const [currentBgHover, setCurrentBgHover] = useState('');
  const { fontSize } = useFontSize();

  useEffect(() => {
    if (props.btnBg === 'blue') {
      setCurrentBg('bg-blue-700');
      setCurrentBgHover('hover:bg-blue-800');
    } else if (props.btnBg === 'green') {
      setCurrentBg('bg-green-700');
      setCurrentBgHover('hover:bg-green-800');
    } else if (props.btnBg === 'red') {
      setCurrentBg('bg-red-700');
      setCurrentBgHover('hover:bg-red-800');
    } else {
      setCurrentBg('bg-slate-700');
      setCurrentBgHover('hover:bg-slate-800');
    }
  }, [props.btnBg]);

  return (
    <>
      <motion.button
        className={`rounded ${
          !props.breakWidth ? 'w-32' : ''
        } whitespace-normal break-words ${currentBg} leading-6 p-2 shadow-lg text-white ${currentBgHover} font-medium rounded-lg text-${fontSize}-base ${
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
