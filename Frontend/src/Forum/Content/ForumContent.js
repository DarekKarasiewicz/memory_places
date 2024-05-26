import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { useNavigate } from 'react-router-dom';
import ForumPlace from './ForumPlace';
import { selectForumData, forumDataActions } from 'Redux/forumDataSlice';
import SearchBar from './SearchBar/SearchBar';
import BaseButton from 'Base/BaseButton';

function ForumContent() {
  const dispatch = useDispatch();
  const forumData = useSelector(selectForumData);
  const { t } = useTranslation();
  const [places, setPlaces] = useState(null);
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blockPlaceFetching, setBlockPlaceFetching] = useState(false);

  const fetchPlaceItems = async () => {
    try {
      let placeEndpointUrl = 'http://localhost:8000/memo_places/places/';

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

  const fetchPlaceItemsAdvanced = async (search = null, page) => {
    try {
      let placesEndpointUrl = `http://localhost:8000/memo_places/places/`;

      if (search) {
        placesEndpointUrl += `?place_name=${search}`;
      }

      if (page !== undefined) {
        if (placesEndpointUrl.includes('?')) {
          placesEndpointUrl += `&page=${page}`;
        } else {
          placesEndpointUrl += `?page=${page}`;
        }
      }

      const response = await axios.get(placesEndpointUrl);
      if (response.data === 0) {
        setBlockPlaceFetching(true);
        return;
      }

      if (places.length === 0) {
        setPlaces(response.data);
      } else {
        if (placesEndpointUrl.includes('place_name')) {
          setPlaces(response.data);
        } else {
          setPlaces((prevComments) => [...prevComments, ...response.data]);
        }
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const handleSearchPlaces = (value) => {
    setSearchedText(value);
    fetchPlaceItemsAdvanced(value);
  };

  const loadNewPlaces = () => {
    setCurrentPage(currentPage + 1);
    fetchPlaceItemsAdvanced(null, currentPage + 1);
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
      <div className='w-3/5 flex flex-col gap-6'>
        {places && (
          <div>
            <SearchBar onSearchClick={handleSearchPlaces} />
          </div>
        )}
        <div className='text-3xl font-bold'>{forumData.header_name}</div>
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
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-center'>
            {t('forum.choose_category')}
          </div>
        )}
        {places?.length > 0 && (
          <div className='flex justify-center mt-2'>
            <BaseButton
              name={t('forum.more_places')}
              btnBg='blue'
              onClick={() => loadNewPlaces()}
              disabled={blockPlaceFetching}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ForumContent;
