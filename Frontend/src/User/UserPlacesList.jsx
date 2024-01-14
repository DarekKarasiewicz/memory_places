import { useEffect } from 'react';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';
import UserPlaceItem from './UserPlaceItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserPlacesList = () => {
  const updatePlaceData = useSelector(selectUpdatePlace);
  const user = sessionStorage.getItem('user');
  let userPlaces;
  useEffect(() => {
    axios.get(`http://localhost:8000/memo_places/user=${user.id}`).then((data) => {
      userPlaces = data;
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/memo_places/user=${user.id}`).then((data) => {
      userPlaces = data;
    });
  }, [updatePlaceData]);

  const placesList = Object.keys(userPlaces).map((place, key) => (
    <UserPlaceItem key={key} place={userPlaces[place]} />
  ));

  return <ul className='w-full h-full overflow-scroll '>{placesList}</ul>;
};

export default UserPlacesList;
