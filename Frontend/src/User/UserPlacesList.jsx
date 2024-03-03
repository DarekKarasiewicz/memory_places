import { useState } from 'react';
import UserPlaceItem from './UserPlaceItem';

const UserPlacesList = ({ userPlaces }) => {
  const [clicked, setClicked] = useState(null);

  const placesList = Object.keys(userPlaces).map((place, key) => (
    <UserPlaceItem
      key={key}
      place={userPlaces[place]}
      clickedItem={clicked}
      setClicked={setClicked}
    />
  ));

  return <ul className='w-full overflow-y-auto max-h-[calc(100%)]'>{placesList}</ul>;
};

export default UserPlacesList;
