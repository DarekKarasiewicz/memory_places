import { motion } from 'framer-motion';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUserPlaces } from '../Redux/userPlacesSlice';

const AddPlaceButton = (props) => {
  const userPlacesData = useSelector(selectUserPlaces);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={props.openModal}
      className={`absolute bottom-4 border-2 border-black bg-slate-300 h-14 w-14 rounded-full cursor-pointer flex justify-center items-center ${
        userPlacesData.isOpen ? 'right-1/3' : 'right-1/2'
      }`}
    >
      <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-14 w-14'></img>
    </motion.div>
  );
};

export default AddPlaceButton;
