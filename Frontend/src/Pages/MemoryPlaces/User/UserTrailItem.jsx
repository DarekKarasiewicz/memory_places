import { motion } from 'framer-motion';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { updateTrailActions } from 'Redux/updateTrailSlice';
import { locationActions } from 'Redux/locationSlice';
import { userPlacesActions } from 'Redux/userPlacesSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { approvalModalActions } from 'Redux/approvalModalSlice';

import TrailIcon from 'icons/TrailIcon';
import EditIcon from 'icons/EditIcon';
import TrashIcon from 'icons/TrashIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const UserTrailItem = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const handleUpdateModalVisability = async (e) => {
    e.stopPropagation();

    try {
      const response = await axios.get(`${appPath}/memo_places/path/pk=${props.trail.id}`);
      dispatch(userPlacesActions.changeIsOpen());
      dispatch(updateTrailActions.changeUpdateTrail(response.data));
      dispatch(modalsActions.changeIsTrailUpdateFormOpen());
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const directToTrailOnMap = () => {
    const coordinates = JSON.parse(props.trail.coordinates);
    const middleIndex = Math.floor(coordinates.length / 2);
    dispatch(locationActions.changeLocation(coordinates[middleIndex]));
    props.setClicked(props.trail.id);
  };

  const handleTrailDelete = (e) => {
    e.stopPropagation();

    dispatch(approvalModalActions.changeIsApprovalModalOpen());
    dispatch(approvalModalActions.changeId(props.trail.id));
    dispatch(approvalModalActions.changeType('trail'));
  };

  return (
    <li
      className={`flex h-20 first:mt-0 mt-5 mx-5 p-2 rounded-lg flex-row ${
        props.trail.verified === true ? 'bg-secondaryBgColor' : 'bg-yellow-500'
      } text-textColor shadow-itemShadow hover:bg-thirdBgColor hover:cursor-pointer ${
        props.clickedItem === props.trail.id ? 'border-2 border-contrastColor' : ''
      }`}
      key={props.trail.id}
      onClick={directToTrailOnMap}
    >
      <div className='w-2/12 lg:max-xl:w-1/12 flex justify-center items-center text-center ml-2'>
        <TrailIcon className='w-1/2 lg:max-xl:w-full' />
      </div>
      <div className='w-7/12 lg:max-xl:w-8/12 flex flex-col mx-2'>
        <h2 className={`truncate font-semibold h-full text-${fontSize}-base`}>
          {props.trail.path_name}
        </h2>
        <p className={`text-${fontSize}-sm`}>{props.trail.creation_date}</p>
      </div>
      {props.trail.verified === false && (
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
      )}
    </li>
  );
};

export default UserTrailItem;
