import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { modalsActions } from 'Redux/modalsSlice';
import { updatePlaceActions } from 'Redux/updatePlaceSlice';
import { useDispatch } from 'react-redux';
import { locationActions } from 'Redux/locationSlice';
import { deletePlace } from 'Redux/allMapPlacesSlice';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from 'utils';
import { userPlacesActions } from 'Redux/userPlacesSlice';
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

const UserPlaceItem = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);

  const handleUpdateModalVisability = (e) => {
    e.stopPropagation();
    dispatch(userPlacesActions.changeIsOpen());
    dispatch(updatePlaceActions.changeUpdatePlace(props.place));
    dispatch(modalsActions.changeIsUpdateModalOpen());
  };

  const directToPlaceOnMap = () => {
    dispatch(locationActions.changeLocation({ lat: props.place.lat, lng: props.place.lng }));
    props.setClicked(props.place.id);
  };

  const handlePlaceDelete = (e) => {
    e.stopPropagation();
    if (confirm(t('common.place_delete_warning'))) {
      axios.delete(`http://localhost:8000/memo_places/places/${props.place.id}`).then(() => {
        dispatch(deletePlace(props.place.id));
        registerAppChanges('admin.changes_messages.place_delete', cookies.user, props.place.id);
      });
    }
  };

  const iconComponents = {
    archaeological: <ArchaeologicalSiteIcon className='min-w-max min-h-max' />,
    battlefield: <BattlefieldIcon className='min-w-max min-h-max' />,
    burial_site: <BurialSiteIcon className='min-w-max min-h-max' />,
    civil_cemetery: <CivilCemeteryIcon className='min-w-max min-h-max' />,
    execution_site: <ExecutionSiteIcon className='min-w-max min-h-max' />,
    historical_monument: <HistoricalMonumentIcon className='min-w-max min-h-max' />,
    war_cemetery: <WarCemeteryIcon className='min-w-max min-h-max' />,
    wayside_shrine: <WaysideShrineIcon className='min-w-max min-h-max' />,
  };

  const IconComponent = iconComponents[props.place.type] || t('common.no_image_error');

  return (
    <li
      className={`flex h-20 first:mt-0 mt-5 mx-5 p-2 rounded-lg flex-row bg-secondaryBgColor text-textColor shadow-itemShadow hover:bg-thirdBgColor hover:cursor-pointer ${
        props.clickedItem === props.place.id ? 'border-2 border-contrastColor' : ''
      }`}
      key={props.place.id}
      onClick={directToPlaceOnMap}
    >
      <div className='w-2/12 flex justify-center items-center text-center ml-2'>
        {IconComponent}
      </div>
      <div className='w-7/12 flex flex-col mx-2'>
        <h2 className='truncate font-semibold h-full'>{props.place.place_name}</h2>
        <p className='text-sm'>{props.place.creation_date}</p>
      </div>
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
    </li>
  );
};

export default UserPlaceItem;
