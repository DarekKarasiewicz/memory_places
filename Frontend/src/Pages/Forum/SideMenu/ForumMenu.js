import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { forumDataActions } from 'Redux/forumDataSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import TrendIcon from 'icons/TrendIcon';
import BaseButton from 'Components/Base/BaseButton';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ForumMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [types, setTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();
  const { fontSize } = useFontSize();
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllPeriods, setShowAllPeriods] = useState(false);
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`${appPath}/memo_places/types`);
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
      const responsePeriod = await axios.get(`${appPath}/memo_places/periods`);
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

  const typesToShow = showAllTypes ? types : types.slice(0, 3);
  const periodsToShow = showAllPeriods ? periods : periods.slice(0, 3);

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
              <div className={`text-textColor text-${fontSize}-xl`}>{t('admin.content.type')}</div>
              <hr className='border-t-1 w-full border-textColor' />
              <div className='flex flex-col justify-start gap-2'>
                {typesToShow.length > 0 && (
                  <>
                    {typesToShow.map((item, index) => (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-3 p-1 text-textColor hover:text-cyan-600 cursor-pointer transition`}
                        key={index}
                        onClick={() => {
                          dispatch(forumDataActions.changePeriodId(null));

                          dispatch(forumDataActions.changeisDataContentMounted(true));
                          dispatch(forumDataActions.changeTypeId(item.id));
                          dispatch(forumDataActions.changeHeaderName(item.name));
                          dispatch(forumDataActions.changeRefreshContentData(true));
                          navigate('/forum');
                        }}
                      >
                        <TrendIcon className='h-6 w-6' />
                        <span className={`text-${fontSize}-base`}>{item.name}</span>
                      </motion.div>
                    ))}
                  </>
                )}
                {types.length > 3 && (
                  <div className='flex justify-center'>
                    <BaseButton
                      btnBg='blue'
                      onClick={() => setShowAllTypes((prev) => !prev)}
                      name={showAllTypes ? t('forum.show_less') : t('forum.show_more')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 w-full'>
            <div className={`text-textColor text-${fontSize}-xl`}>{t('admin.content.period')}</div>
            <hr className='border-t-1 w-full border-textColor' />
            <div className='flex flex-col justify-start gap-2'>
              {periodsToShow.length > 0 && (
                <>
                  {periodsToShow.map((item, index) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-3 p-1 text-textColor hover:text-cyan-600 cursor-pointer transition`}
                      key={index}
                      onClick={() => {
                        dispatch(forumDataActions.changeTypeId(null));
                        dispatch(forumDataActions.changeisDataContentMounted(true));
                        dispatch(forumDataActions.changePeriodId(item.id));
                        dispatch(forumDataActions.changeHeaderName(item.name));
                        dispatch(forumDataActions.changeRefreshContentData(true));
                        navigate('/forum');
                      }}
                    >
                      <TrendIcon className='h-6 w-6' />
                      <span className={`text-${fontSize}-base`}>{item.name}</span>
                    </motion.div>
                  ))}
                </>
              )}
              {periods.length > 3 && (
                <div className='flex justify-center'>
                  <BaseButton
                    btnBg='blue'
                    onClick={() => setShowAllPeriods((prev) => !prev)}
                    name={showAllPeriods ? t('forum.show_less') : t('forum.show_more')}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ForumMenu;
