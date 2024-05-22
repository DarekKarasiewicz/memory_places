import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { useNavigate } from 'react-router-dom';
import ForumPlace from './ForumPlace';

function ForumContent() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [places, setPlaces] = useState(null);
  const navigate = useNavigate();

  const fetchPostItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/memo_places/places/`);
      const modifiedPlaceData = response.data.filter((item) => item.verified === true);
      setPlaces(modifiedPlaceData);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    fetchPostItems();
  }, []);

  return (
    <>
      <div className='w-3/5 flex flex-col gap-6'>
        <div className='text-3xl font-bold'>Zabytek</div>
        <div className='flex flex-col gap-4'>
          {places &&
            places.map((item, index) => (
              <>
                {index !== 0 && <hr />}
                <ForumPlace currentData={item} onClick={() => navigate('/forum/' + item.id)} />
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default ForumContent;
