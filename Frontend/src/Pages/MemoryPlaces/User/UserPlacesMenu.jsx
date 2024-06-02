import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPlaces, userPlacesActions } from 'Redux/userPlacesSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import UserObjectsList from './UserObjectsList';
import CancelIcon from 'icons/CancelIcon';
import PlaceIcon from 'icons/PlaceIcon';
import TrailIcon from 'icons/TrailIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const UserMenu = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [userPlaces, setUserPlaces] = useState(null);
  const [userTrails, setUserTrails] = useState(null);
  const userPlaceData = useSelector(selectUserPlaces);
  const { t } = useTranslation();
  const { fontSize } = useFontSize();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/short_places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
        dispatch(userPlacesActions.changeIsPlaceDataShouldReload(false));
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });

    axios
      .get(`http://localhost:8000/memo_places/short_path/user=${user.user_id}`)
      .then((response) => {
        setUserTrails(response.data);
        dispatch(userPlacesActions.changeIsTrailDataShouldReload(false));
      })
      .catch((error) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, []);

  useEffect(() => {
    if (userPlaceData.shouldPlaceDataReload === true) {
      axios
        .get(`http://localhost:8000/memo_places/short_places/user=${user.user_id}`)
        .then((response) => {
          setUserPlaces(response.data);
          dispatch(userPlacesActions.changeIsPlaceDataShouldReload(false));
        })
        .catch((error) => {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        });
    }
  }, [userPlaceData.shouldPlaceDataReload]);

  useEffect(() => {
    if (userPlaceData.shouldTrailDataReload === true) {
      axios
        .get(`http://localhost:8000/memo_places/short_path/user=${user.user_id}`)
        .then((response) => {
          setUserTrails(response.data);
          dispatch(userPlacesActions.changeIsTrailDataShouldReload(false));
        })
        .catch((error) => {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        });
    }
  }, [userPlaceData.shouldTrailDataReload]);

  const handleUserPlacesClose = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleObjectChange = () => {
    dispatch(userPlacesActions.changeIsTrailActive());
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-1/3 h-screen bg-mainBgColor pb-4 shadow-xl flex flex-col gap-2`}
    >
      <div className='h-12 my-2 mx-4 flex justify-between items-center'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleUserPlacesClose}
          className='h-10 w-10 flex justify-center items-center cursor-pointer'
        >
          <CancelIcon />
        </motion.div>
        <div
          className={`w-full text-${fontSize}-xl font-bold flex justify-center items-center normal-case text-textColor`}
        >
          {userPlaceData.isTrailActive ? t('user.your_trails') : t('user.your_memory_places')}
        </div>
        <div className='flex flex-row'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='h-10 w-10 flex justify-center items-center cursor-pointer'
            onClick={() => handleObjectChange()}
          >
            {userPlaceData.isTrailActive ? <TrailIcon /> : <PlaceIcon />}
          </motion.div>
        </div>
      </div>
      {userPlaces && userTrails && (
        <UserObjectsList
          userPlaces={userPlaces}
          userTrails={userTrails}
          isTrailActive={userPlaceData.isTrailActive}
        />
      )}
    </div>
  );
};

export default UserMenu;
