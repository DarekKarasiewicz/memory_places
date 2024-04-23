import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';
import PlaceIcon from '../icons/PlaceIcon';
import TrailIcon from '../icons/TrailIcon';

const AddingOption = ({ type }) => {
  const dispatch = useDispatch();
  const handleTrailClick = () => {
    dispatch(modalsActions.changeIsTrailFormOpen());
  };
  const handlePlaceClick = () => {
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const iconComponents = {
    place: <PlaceIcon />,
    trail: <TrailIcon />,
  };

  const IconComponent = iconComponents[type] || null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-mainBgColor h-12 w-12 rounded-full cursor-pointer flex justify-center items-center m-auto shadow-itemShadow`}
      onClick={type === 'trail' ? handleTrailClick : handlePlaceClick}
    >
      {IconComponent}
    </motion.div>
  );
};

export default AddingOption;
