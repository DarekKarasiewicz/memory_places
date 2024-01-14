import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { modalsActions } from '../Redux/modalsSlice';
import { updatePlaceActions } from '../Redux/updatePlaceSlice';
import { useDispatch } from 'react-redux';

const UserPlaceItem = (props) => {
  const [visability, setVisability] = useState('flex');
  const dispatch = useDispatch();

  const handleUpdateModalVisability = () => {
    dispatch(modalsActions.changeIsUpdateModalOpen());
    dispatch(updatePlaceActions.changeUpdatePlace(props.place));
  };

  const handlePlaceDelete = () => {
    // Need to fix it when backend ready
    // axios.delete(`http://localhost:8000/memo_places/places/place&id=${place.id}`).then(() => {
    setVisability('hidden');
    // });
  };

  return (
    <li
      className={`bg-white h-34 mt-5 mx-5 p-2 rounded-lg ${visability} flex-row `}
      onClick={props.onClick}
      //need to add display place info on click when component ready
      key={props.place.id}
    >
      <div className='w-1/3 h-full'>
        <img
          src='../../assets/memorial_places_logo.png'
          alt='Place foto'
          className='h-full w-full'
        />
      </div>
      <div className='w-2/3'>
        <div className='w-full h-1/2 pl-1'>
          <h2 className='truncate'>{props.place.title}</h2>
          <p className='text-end text-xs'>
            date
            {/* {place.found_date} */}
          </p>
        </div>
        <div className='w-full h-1/2 pl-1 flex justify-end items-center'>
          <motion.div
            className='rounded-full bg-green-700 h-10 w-10 mr-5 flex justify-center items-center hover:bg-green-900'
            onClick={handleUpdateModalVisability}
            whileHover={{
              scale: 1.1,
            }}
          >
            <img src='../../assets/edit_white_icon.svg' className='w-6 h-6' />
          </motion.div>
          <motion.div
            className='rounded-full bg-red-700 h-10 w-10 flex justify-center items-center hover:bg-red-900'
            whileHover={{
              scale: 1.1,
            }}
            onClick={handlePlaceDelete}
          >
            <img src='../../assets/trash_icon.svg' className='w-6 h-6' />
          </motion.div>
        </div>
      </div>
    </li>
  );
};

export default UserPlaceItem;
