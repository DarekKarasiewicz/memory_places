import { motion } from 'framer-motion';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { updatePlaceActions } from 'Redux/updatePlaceSlice';
import { locationActions } from 'Redux/locationSlice';
import { userPlacesActions } from 'Redux/userPlacesSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { approvalModalActions } from 'Redux/approvalModalSlice';

import ArchaeologicalSiteIcon from 'icons/places_icons/ArchaeologicalSiteIcon';
import BattlefieldIcon from 'icons/places_icons/BattlefieldIcon';
import BurialSiteIcon from 'icons/places_icons/BurialSiteIcon';
import CivilCemeteryIcon from 'icons/places_icons/CivilCemeteryIcon';
import ExecutionSiteIcon from 'icons/places_icons/ExecutionSiteIcon';
import HistoricalMonumentIcon from 'icons/places_icons/HistoricalMonumentIcon';
import WarCemeteryIcon from 'icons/places_icons/WarCemeteryIcon';
import WaysideShrineIcon from 'icons/places_icons/WaysideShrineIcon';
import EditIcon from 'icons/EditIcon';
import TrashIcon from 'icons/TrashIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const UserPlaceItem = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { fontSize } = useFontSize();

  const handleUpdateModalVisability = async (e) => {
    e.stopPropagation();

    try {
      const response = await axios.get(
        `http://localhost:8000/memo_places/places/pk=${props.place.id}`,
      );
      dispatch(userPlacesActions.changeIsOpen());
      dispatch(updatePlaceActions.changeUpdatePlace(response.data));
      dispatch(modalsActions.changeIsUpdateModalOpen());
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const directToPlaceOnMap = () => {
    dispatch(locationActions.changeLocation({ lat: props.place.lat, lng: props.place.lng }));
    props.setClicked(props.place.id);
  };

  const handlePlaceDelete = (e) => {
    e.stopPropagation();

    dispatch(approvalModalActions.changeIsApprovalModalOpen());
    dispatch(approvalModalActions.changeId(props.place.id));
    dispatch(approvalModalActions.changeType('place'));
  };

  const iconComponents = {
    1: <CivilCemeteryIcon className='w-1/2 lg:max-xl:w-full' />,
    2: <BurialSiteIcon className='w-1/2 lg:max-xl:w-full' />,
    3: <HistoricalMonumentIcon className='w-1/2 lg:max-xl:w-full' />,
    4: <WaysideShrineIcon className='w-1/2 lg:max-xl:w-full' />,
    5: <BattlefieldIcon className='w-1/2 lg:max-xl:w-full' />,
    6: <ExecutionSiteIcon className='w-1/2 lg:max-xl:w-full' />,
    7: <ArchaeologicalSiteIcon className='w-1/2 lg:max-xl:w-full' />,
    8: <WarCemeteryIcon className='w-1/2 lg:max-xl:w-full' />,
  };

  const IconComponent = iconComponents[props.place.type] || t('common.no_image_error');

  return (
    <li
      className={`flex h-20 first:mt-0 mt-5 mx-5 p-2 rounded-lg flex-row ${
        props.place.verified === true ? 'bg-secondaryBgColor' : 'bg-yellow-500'
      } text-textColor shadow-itemShadow hover:bg-thirdBgColor hover:cursor-pointer ${
        props.clickedItem === props.place.id ? 'border-2 border-contrastColor' : ''
      }`}
      key={props.place.id}
      onClick={directToPlaceOnMap}
    >
      <div className='w-2/12 lg:max-xl:w-1/12 flex justify-center items-center text-center ml-2'>
        {IconComponent}
      </div>
      <div className='w-7/12 lg:max-xl:w-8/12 flex flex-col mx-2'>
        <h2 className={`truncate font-semibold h-full text-${fontSize}-base`}>
          {props.place.place_name}
        </h2>
        <p className={`text-${fontSize}-sm`}>{props.place.creation_date}</p>
      </div>
      {props.place.verified === false && (
        <div className='w-3/12 flex justify-end items-center gap-2 mr-2'>
          <motion.div
            className='rounded-full bg-green-700 h-10 w-10 flex justify-center items-center hover:bg-green-900 cursor-pointer'
            onClick={handleUpdateModalVisability}
            whileHover={{
              scale: 1.05,
            }}
          >
            <EditIcon className='w-6 h-6' color='#ffffff' />
          </motion.div>
          <motion.div
            className='rounded-full bg-red-700 h-10 w-10 flex justify-center items-center hover:bg-red-900 cursor-pointer'
            whileHover={{
              scale: 1.05,
            }}
            onClick={handlePlaceDelete}
          >
            <TrashIcon className='w-6 h-6' color='#ffffff' />
          </motion.div>
        </div>
      )}
    </li>
  );
};

export default UserPlaceItem;
