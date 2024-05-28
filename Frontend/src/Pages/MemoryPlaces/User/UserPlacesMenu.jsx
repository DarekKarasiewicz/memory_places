import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdatePlace } from 'Redux/updatePlaceSlice';
import { selectUserPlaces, userPlacesActions } from 'Redux/userPlacesSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import UserObjectsList from './UserObjectsList';
import CancelIcon from 'icons/CancelIcon';
import PlaceIcon from 'icons/PlaceIcon';
import TrailIcon from 'icons/TrailIcon';

const UserMenu = () => {
  const filterPlaces = useSelector((state) => state.allMapPlaces.filterItems);
  const filteredTrails = useSelector((state) => state.allMapTrails.filterItems);
  const updatePlaceData = useSelector(selectUpdatePlace);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [userPlaces, setUserPlaces] = useState(null);
  const [userTrails, setUserTrails] = useState(null);
  const isTrailActive = useSelector(selectUserPlaces).isTrailActive;
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
    axios
      .get(`http://localhost:8000/memo_places/path/user=${user.user_id}`)
      .then((response) => {
        setUserTrails(response.data);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, [filterPlaces]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/path/user=${user.user_id}`)
      .then((response) => {
        setUserTrails(response.data);
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, [filteredTrails]);

  const handleUserPlacesClose = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleObjectChange = () => {
    dispatch(userPlacesActions.changeIsTrailActive());
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-1/3 h-screen bg-mainBgColor pb-5 shadow-xl flex flex-col gap-4`}
    >
      <div className='h-12 my-2 mx-4 flex justify-between items-center'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleUserPlacesClose}
          className='h-10 w-10 flex justify-center items-center cursor-pointer'
        >
          <CancelIcon />
        </motion.div>
        <div className='w-full text-xl font-bold flex justify-center items-center normal-case text-textColor'>
          {isTrailActive ? t('user.your_trails') : t('user.your_memory_places')}
        </div>
        <div className='flex flex-row'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='h-10 w-10 flex justify-center items-center cursor-pointer'
            onClick={() => handleObjectChange()}
          >
            {isTrailActive ? <TrailIcon /> : <PlaceIcon />}
          </motion.div>
        </div>
      </div>
      {userPlaces && userTrails && (
        <UserObjectsList
          userPlaces={userPlaces}
          userTrails={userTrails}
          isTrailActive={isTrailActive}
        />
      )}
    </div>
  );
};

export default UserMenu;
