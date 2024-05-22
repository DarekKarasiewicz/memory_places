import { useDispatch } from 'react-redux';
import axios from 'axios';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TrendIcon from 'icons/TrendIcon';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ForumMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [types, setTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-6 items-center'>
        <section className='w-28 flex justify-center items-center'>
          <img
            src='/assets/memory_places_logo.png'
            alt='memorial place logo'
            className='h-full w-auto'
          ></img>
        </section>
        <section className='flex flex-col items-center gap-6 w-full text-textColor'>
          <div className='flex flex-col items-start gap-3 w-full'>
            <div className='flex flex-col items-center gap-3 w-full'>
              <div className='text-textColor text-xl'>Types</div>
              <hr className='border-t-1 w-full border-textColor' />
              <div className='flex flex-col justify-start gap-2'>
                {types.length > 0 && (
                  <>
                    {types.map((item, index) => (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-3 p-1 text-textColor hover:text-cyan-600 cursor-pointer transition`}
                        key={index}
                      >
                        <TrendIcon className='h-6 w-6' />
                        <span>{item.name}</span>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 w-full'>
            <div className='text-textColor text-xl'>Periods</div>
            <hr className='border-t-1 w-full border-textColor' />
            <div className='flex flex-col justify-start gap-2'>
              {periods.length > 0 && (
                <>
                  {periods.map((item, index) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-3 p-1 text-textColor hover:text-cyan-600 cursor-pointer transition`}
                      key={index}
                    >
                      <TrendIcon className='h-6 w-6' />
                      <span>{item.name}</span>
                    </motion.div>
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
