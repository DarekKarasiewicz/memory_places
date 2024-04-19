import UserObjectsList from './UserObjectsList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';
import { userPlacesActions } from '../Redux/userPlacesSlice';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const UserMenu = () => {
  const filterPlaces = useSelector((state) => state.allMapPlaces.filterItems);
  const filteredTrails = useSelector((state) => state.allMapTrails.filterItems);
  const updatePlaceData = useSelector(selectUpdatePlace);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [userPlaces, setUserPlaces] = useState(null);
  const [userTrails, setUserTrails] = useState(null);
  const [isPlaceActive, setIsPlaceActive] = useState(true);
  const [isTrailActive, setIsTrailActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        alert(t('common.axios_warning'));
      });
    axios
      .get(`http://localhost:8000/memo_places/path/user=${user.user_id}`)
      .then((response) => {
        setUserTrails(response.data);
      })
      .catch((error) => {
        alert(t('common.axios_warning'));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        alert(t('common.axios_warning'));
      });
  }, [filterPlaces]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/path/user=${user.user_id}`)
      .then((response) => {
        setUserTrails(response.data);
      })
      .catch((error) => {
        alert(t('common.axios_warning'));
      });
  }, [filteredTrails]);

  const handleUserPlacesClose = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  const handleObjectChange = () => {
    setIsPlaceActive(!isPlaceActive);
    setIsTrailActive(!isTrailActive);
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-1/3 h-screen bg-slate-600 pb-5 shadow-xl flex flex-col`}
    >
      <div className='h-12 m-2 flex justify-between'>
        <div className=' w-12'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300'
            onClick={handleUserPlacesClose}
          >
            <img src={'./assets/cancel_icon.svg'} alt='cancel_icon' className='h-8 w-8'></img>
          </motion.div>
        </div>

        <div className=' w-full h-12 text-2xl flex justify-center items-center '>
          {isTrailActive ? t('user.your_memory_places') : t('user.your_trails')}
        </div>

        <div className='flex flex-row'>
          <motion.div
            whileHover={isPlaceActive ? { scale: 1 } : { scale: 1.05 }}
            className={`rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer ${
              isPlaceActive ? 'bg-slate-500' : 'bg-slate-300'
            }`}
            onClick={() => !isPlaceActive && handleObjectChange()}
          >
            <img src={`./assets/place_icon.svg`} alt='cancel_icon' className='h-8 w-8'></img>
          </motion.div>

          <motion.div
            whileHover={isTrailActive ? { scale: 1 } : { scale: 1.05 }}
            className={`rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer ${
              isTrailActive ? 'bg-slate-500' : 'bg-slate-300'
            } `}
            onClick={() => !isTrailActive && handleObjectChange()}
          >
            <img src={`./assets/trail_icon.svg`} alt='cancel_icon' className='h-8 w-8'></img>
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
