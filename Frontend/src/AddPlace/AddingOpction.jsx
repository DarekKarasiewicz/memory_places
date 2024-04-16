import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';

const AddingOption = ({ type }) => {
  const dispatch = useDispatch();
  const handleTrailClick = () => {
    dispatch(modalsActions.changeIsTrailFormOpen());
  };
  const handlePlaceClick = () => {
    dispatch(modalsActions.changeIsFormModalOpen());
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border-2 border-black bg-slate-300 h-12 w-12 rounded-full cursor-pointer flex justify-center items-center m-auto`}
      onClick={type === 'trail' ? handleTrailClick : handlePlaceClick}
    >
      <img src={`./assets/${type}_icon.svg`} alt='' className='h-8 w-8'></img>
    </motion.div>
  );
};

export default AddingOption;
