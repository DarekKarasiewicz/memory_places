import { motion } from 'framer-motion';

function BaseModal(props) {
  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div className='m-auto w-1/3 rounded border-2 border-black h-auto p-2 bg-slate-300 relative'>
          <motion.div
            className='rounded-full absolute -top-5 -right-5 border-2 h-10 w-10 border-black flex justify-center items-center bg-slate-300 cursor-pointer'
            onClick={props.closeModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src='./assets/cancel_icon.svg' alt='cancel_icon' className='h-8 w-8'></img>
          </motion.div>
          <div className='text-center border-b-2 border-black pb-2 text-xl'>{props.title}</div>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default BaseModal;
