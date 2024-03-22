import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { modalsActions } from '../Redux/modalsSlice';
import { updateTrailActions } from '../Redux/updateTrailSlice';
import { useDispatch } from 'react-redux';
import { locationActions } from '../Redux/locationSlice';
import { deleteTrail } from '../Redux/allMapTrailsSlice';
import { userPlacesActions } from '../Redux/userPlacesSlice';
import { useTranslation } from 'react-i18next';

const UserTrailItem = (props) => {
  const [visability, setVisability] = useState('flex');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleUpdateModalVisability = (e) => {
    e.stopPropagation();
    dispatch(updateTrailActions.changeUpdateTrail(props.trail));
    dispatch(modalsActions.changeIsTrailUpdateFormOpen());
    dispatch(userPlacesActions.changeIsOpen());
  };

  const directToTrailOnMap = () => {
    const coordinates = JSON.parse(props.trail.coordinates);
    const middleIndex = Math.floor(coordinates.length / 2);
    dispatch(locationActions.changeLocation(coordinates[middleIndex]));
    props.setClicked(props.trail.id);
  };

  const handleTrailDelete = (e) => {
    e.stopPropagation();
    if (confirm(t('common.trail_delete_warning'))) {
      axios.delete(`http://localhost:8000/memo_places/path/${props.trail.id}`).then(() => {
        setVisability('hidden');
        dispatch(deleteTrail(props.trail.id));
      });
    }
  };

  return (
    <li
      className={`h-20 first:mt-0 mt-5 mx-5 p-2 rounded-lg ${visability} flex-row ${
        props.clickedItem === props.trail.id ? 'bg-slate-400' : 'bg-slate-300'
      }`}
      key={props.trail.id}
      onClick={directToTrailOnMap}
    >
      <div className='w-2/12 flex justify-center items-center'>
        <img src={`../../assets/trail_icon.svg`} alt='trail_icon' className='min-w-max min-h-max' />
      </div>
      <div className='w-7/12 flex flex-col ml-1 mr-1'>
        <h2 className='truncate font-semibold h-full'>{props.trail.path_name}</h2>
        <p className='text-sm'>{props.trail.found_date}</p>
      </div>
      <div className='w-3/12 flex justify-end items-center gap-2'>
        <motion.div
          className='rounded-full bg-green-700 h-10 w-10 flex justify-center items-center hover:bg-green-900 cursor-pointer'
          whileHover={{
            scale: 1.05,
          }}
          onClick={handleUpdateModalVisability}
        >
          <img src='../../assets/edit_white_icon.svg' className='w-6 h-6' />
        </motion.div>
        <motion.div
          className='rounded-full bg-red-700 h-10 w-10 flex justify-center items-center hover:bg-red-900 cursor-pointer'
          whileHover={{
            scale: 1.05,
          }}
          onClick={handleTrailDelete}
        >
          <img src='../../assets/trash_icon.svg' className='w-6 h-6' />
        </motion.div>
      </div>
    </li>
  );
};

export default UserTrailItem;