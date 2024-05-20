import { useDispatch } from 'react-redux';
import axios from 'axios';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TrendIcon from 'icons/TrendIcon';

function ForumMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(0);
  const [types, setTypes] = useState([]);
  const [periods, setPeriods] = useState([]);

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/memo_places/types`);
      const typeItems = responseType.data
        .map((obj) => ({
          id: obj.id,
          name: t(`modal.${obj.value}`),
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      setTypes(typeItems);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/memo_places/periods`);
      const periodItems = responsePeriod.data
        .map((obj) => ({
          id: obj.id,
          name: t(`modal.${obj.value}`),
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      setPeriods(periodItems);
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const handleClick = (id) => {
    setActiveItem(id);
  };

  useEffect(() => {
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-6 items-center'>
        <section className='w-28 flex justify-center items-center'>
          <img
            src='./assets/memory_places_logo.png'
            alt='memorial place logo'
            className='h-full w-auto'
          ></img>
        </section>
        <hr className='border-t-1 w-full border-textColor' />
        <section className='flex flex-col items-center gap-6 w-full text-textColor'>
          <div className='flex flex-col items-center gap-3 w-full'>
            <div
              className={`${
                activeItem === 0 ? 'border-l-4 pl-2 border-cyan-600 text-cyan-600' : ''
              } flex items-center gap-3 p-1 text-textColor hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer transition`}
              onClick={() => handleClick(0)}
            >
              <TrendIcon className='h-6 w-6' />
              <span>Popular</span>
            </div>
            <div className='text-textColor text-xl'>Types</div>
            <hr className='border-t-1 w-full border-textColor' />
            <div className='flex flex-col justify-start gap-2'>
              {types.length > 0 && (
                <>
                  {types.map((item, index) => (
                    <div
                      className={`${
                        activeItem === item.id
                          ? 'border-l-4 pl-2 border-cyan-600 text-cyan-600'
                          : ''
                      } flex items-center gap-3 p-1 text-textColor hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer transition`}
                      key={index}
                      onClick={() => handleClick(item.id)}
                    >
                      <TrendIcon className='h-6 w-6' />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 w-full'>
            <div className='text-textColor text-xl'>Periods</div>
            <hr className='border-t-1 w-full border-textColor' />
            <div className='flex flex-col justify-start gap-2'>
              {periods.length > 0 && (
                <>
                  {periods.map((item, index) => (
                    <div
                      className={`${
                        activeItem === item.id
                          ? 'border-l-4 pl-2 border-cyan-600 text-cyan-600'
                          : ''
                      } flex items-center gap-3 p-1 text-textColor hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer transition`}
                      key={index}
                      onClick={() => handleClick(item.id)}
                    >
                      <TrendIcon className='h-6 w-6' />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ForumMenu;
