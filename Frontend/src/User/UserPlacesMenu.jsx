import UserPlacesList from './UserPlacesList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';
import { userPlacesActions } from '../Redux/userPlacesSlice';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const UserMenu = () => {
  const updatePlaceData = useSelector(selectUpdatePlace);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [userPlaces, setUserPlaces] = useState(null);
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
  }, [updatePlaceData]);

  const handleUserPlacesClose = () => {
    dispatch(userPlacesActions.changeIsOpen());
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-1/3 h-screen bg-slate-600 pb-5 shadow-xl flex flex-col ${
        userPlaces && userPlaces.length < 1 ? 'flex justify-center items-center' : ''
      }`}
    >
      <div className='h-12 m-2 flex'>
        <div className='absolute w-12'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300'
            onClick={handleUserPlacesClose}
          >
            <img src={'./assets/cancel_icon.svg'} alt='cancel_icon' className='h-8 w-8'></img>
          </motion.div>
        </div>

        <div className='w-full h-12 text-2xl flex justify-center items-center '>Your Places</div>
      </div>
      {userPlaces &&
        (userPlaces.length < 1 ? (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            {t('common.place_warning')}
          </div>
        ) : (
          <UserPlacesList userPlaces={userPlaces} />
        ))}
    </div>
  );
};

export default UserMenu;
