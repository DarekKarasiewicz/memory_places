import UserPlacesList from './UserPlacesList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdatePlace } from '../Redux/updatePlaceSlice';

const UserMenu = () => {
  const updatePlaceData = useSelector(selectUpdatePlace);
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [userPlaces, setUserPlaces] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        alert('Somthing went wrong, try again later');
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/memo_places/places/user=${user.user_id}`)
      .then((response) => {
        setUserPlaces(response.data);
      })
      .catch((error) => {
        alert('Somthing went wrong, try again later');
      });
  }, [updatePlaceData]);

  return (
    <div
      className={`absolute bottom-0 left-0 w-1/3 h-screen bg-slate-300 pb-5 ${
        userPlaces && userPlaces.length < 1 && 'flex justify-center items-center'
      }`}
    >
      {userPlaces &&
        (userPlaces.length < 1 ? (
          <div>No added place yet </div>
        ) : (
          <UserPlacesList userPlaces={userPlaces} />
        ))}
    </div>
  );
};

export default UserMenu;
