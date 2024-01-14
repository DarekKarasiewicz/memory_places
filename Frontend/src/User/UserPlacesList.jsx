import { useEffect } from 'react';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';
import UserPlaceItem from './UserPlaceItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const userPlaces = {
  1: {
    id: 1,
    title: 'test 1',
  },
  2: {
    id: 2,
    title: 'test 2',
  },
  3: {
    id: 3,
    title: 'test 3',
  },
  4: {
    id: 4,
    title: 'test 4',
  },
};

const UserPlacesList = () => {
  const updatePlaceData = useSelector(selectUpdatePlace);
  // Need to fix it when backend ready
  useEffect(() => {
    // axios.get(`http://localhost:8000/memo_places/places&id=${}`).then(() => {});
  }, []);

  useEffect(() => {
    // axios.get(`http://localhost:8000/memo_places/places&id=${}`).then(() => {});
  }, [updatePlaceData]);

  const placesList = Object.keys(userPlaces).map((place, key) => (
    <UserPlaceItem key={key} place={userPlaces[place]} />
  ));

  return <ul className='w-full h-full overflow-scroll '>{placesList}</ul>;
};

export default UserPlacesList;
