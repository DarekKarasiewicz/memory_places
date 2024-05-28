import { motion } from 'framer-motion';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { updateTrailActions } from 'Redux/updateTrailSlice';
import { locationActions } from 'Redux/locationSlice';
import { deleteTrail } from 'Redux/allMapTrailsSlice';
import { userPlacesActions } from 'Redux/userPlacesSlice';

import TrailIcon from 'icons/TrailIcon';
import EditIcon from 'icons/EditIcon';
import TrashIcon from 'icons/TrashIcon';

import { registerAppChanges } from 'utils';

const UserTrailItem = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);

  const handleUpdateModalVisability = (e) => {
    e.stopPropagation();
    dispatch(userPlacesActions.changeIsOpen());
    dispatch(updateTrailActions.changeUpdateTrail(props.trail));
    dispatch(modalsActions.changeIsTrailUpdateFormOpen());
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
        dispatch(deleteTrail(props.trail.id));
        registerAppChanges('admin.changes_messages.trail_delete', cookies.user, props.trail.id);
      });
    }
  };

  return (
    <li
      className={`flex h-20 first:mt-0 mt-5 mx-5 p-2 rounded-lg flex-row bg-secondaryBgColor text-textColor shadow-itemShadow hover:bg-thirdBgColor hover:cursor-pointer ${
        props.clickedItem === props.trail.id ? 'border-2 border-contrastColor' : ''
      }`}
      key={props.trail.id}
      onClick={directToTrailOnMap}
    >
      <div className='w-2/12 flex justify-center items-center text-center ml-2'>
        <TrailIcon />
      </div>
      <div className='w-7/12 flex flex-col mx-2'>
        <h2 className='truncate font-semibold h-full'>{props.trail.path_name}</h2>
        <p className='text-sm'>{props.trail.creation_date}</p>
      </div>
      <div className='w-3/12 flex justify-end items-center gap-2 mr-2'>
        <motion.div
          className='rounded-full bg-green-700 h-10 w-10 flex justify-center items-center hover:bg-green-900 cursor-pointer'
          whileHover={{
            scale: 1.05,
          }}
          onClick={handleUpdateModalVisability}
        >
          <EditIcon className='w-6 h-6' color='#ffffff' />
        </motion.div>
        <motion.div
          className='rounded-full bg-red-700 h-10 w-10 flex justify-center items-center hover:bg-red-900 cursor-pointer'
          whileHover={{
            scale: 1.05,
          }}
          onClick={handleTrailDelete}
        >
          <TrashIcon className='w-6 h-6' color='#ffffff' />
        </motion.div>
      </div>
    </li>
  );
};

export default UserTrailItem;
