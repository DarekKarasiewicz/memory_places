import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { selectForumData, forumDataActions } from 'Redux/forumDataSlice';

import ForumPlace from './ForumPlace';
import SearchBar from './SearchBar/SearchBar';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ForumContent() {
  const dispatch = useDispatch();
  const forumData = useSelector(selectForumData);
  const { t } = useTranslation();
  const [places, setPlaces] = useState(null);
  const navigate = useNavigate();
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchPlaceItems = async () => {
    try {
      let placeEndpointUrl = `${appPath}/memo_places/places/`;

      if (forumData.type_id) {
        placeEndpointUrl += `type=${forumData.type_id}`;
      }
      if (forumData.period_id) {
        placeEndpointUrl += `period=${forumData.period_id}`;
      }

      const allPlaces = await axios.get(placeEndpointUrl);

      setPlaces(allPlaces.data);
      dispatch(forumDataActions.changeRefreshContentData(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPlaceItemsAdvanced = async (search) => {
    try {
      let placesEndpointUrl = `${appPath}/memo_places/places/`;

      if (search) {
        placesEndpointUrl += `place_name=${search}`;
      }

      if (forumData.type_id) {
        if (placesEndpointUrl.includes('place_name')) {
          placesEndpointUrl += `?type=${forumData.type_id}`;
        } else {
          placesEndpointUrl += `type=${forumData.type_id}`;
        }
      }
      if (forumData.period_id) {
        if (placesEndpointUrl.includes('place_name')) {
          placesEndpointUrl += `?period=${forumData.period_id}`;
        } else {
          placesEndpointUrl += `period=${forumData.period_id}`;
        }
      }

      const response = await axios.get(placesEndpointUrl);

      if (response.data.length === 0) {
        if (placesEndpointUrl.includes('place_name')) {
          setPlaces([]);
        }
        return;
      }

      const isDataSame = response.data.every((newPlace) =>
        places.some((existingPlace) => existingPlace.id === newPlace.id),
      );

      if (!isDataSame) {
        if (places.length === 0 || placesEndpointUrl.includes('place_name')) {
          setPlaces(response.data);
        } else {
          setPlaces((prevPlaces) => [...prevPlaces, ...response.data]);
        }
      } else {
        if (search) {
          setPlaces(response.data);
        }
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const handleSearchPlaces = (value) => {
    if (value) {
      fetchPlaceItemsAdvanced(value);
    } else {
      fetchPlaceItems();
    }
  };

  useEffect(() => {
    if (!places && forumData.isDataContentMounted === true) {
      fetchPlaceItems();
    }
  }, []);

  useEffect(() => {
    if (forumData.refresh_content_data) {
      fetchPlaceItems();
    }
  }, [forumData.refresh_content_data]);

  return (
    <>
      <div className='w-3/5 sm:max-xl:w-full xl:max-2xl:w-4/5 flex flex-col gap-6'>
        {places && (
          <div>
            <SearchBar onSearchClick={handleSearchPlaces} />
          </div>
        )}
        <div className={`text-${fontSize}-3xl font-bold`}>{forumData.header_name}</div>
        <div className='flex flex-col gap-4'>
          {places &&
            places.map((item, index) => (
              <>
                {index !== 0 && <hr />}
                <ForumPlace
                  currentData={item}
                  onClick={() => {
                    navigate('/forum/' + item.id);
                  }}
                />
              </>
            ))}
        </div>
        {!places && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-${fontSize}-4xl text-center`}
          >
            {t('forum.choose_category')}
          </div>
        )}
      </div>
    </>
  );
}

export default ForumContent;
