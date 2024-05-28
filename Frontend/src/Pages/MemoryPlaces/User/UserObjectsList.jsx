import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UserPlaceItem from './UserPlaceItem';
import UserTrailItem from './UserTrailItem';

const UserPlacesList = ({ userPlaces, userTrails, isTrailActive }) => {
  const [clicked, setClicked] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setClicked(null);
  }, [isTrailActive]);

  const displayPlacesList = () => {
    if (userPlaces.length < 1) {
      return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-textColor whitespace-nowrap text-xl'>
          {t('common.place_warning')}
        </div>
      );
    }

    const placesList = Object.keys(userPlaces).map((place, key) => (
      <UserPlaceItem
        key={key}
        place={userPlaces[place]}
        clickedItem={clicked}
        setClicked={setClicked}
      />
    ));

    return placesList;
  };

  const displayTrailsList = () => {
    if (userTrails.length < 1) {
      return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-textColor whitespace-nowrap text-xl'>
          {t('common.trail_warning')}
        </div>
      );
    }
    const trailsList = Object.keys(userTrails).map((trail, key) => (
      <UserTrailItem
        key={key}
        trail={userTrails[trail]}
        clickedItem={clicked}
        setClicked={setClicked}
      />
    ));
    return trailsList;
  };

  return (
    <ul className='w-full overflow-y-auto max-h-[calc(100%)]'>
      {isTrailActive ? displayTrailsList() : displayPlacesList()}
    </ul>
  );
};

export default UserPlacesList;
