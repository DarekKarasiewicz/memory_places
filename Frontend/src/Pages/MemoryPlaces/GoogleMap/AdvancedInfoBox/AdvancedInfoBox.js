import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { advancedObjectActions, selectAdvancedObject } from 'Redux/advancedObjectSlice';

import BaseModal from 'Components/Base/BaseModal';
import BaseButton from 'Components/Base/BaseButton';
import ImageSlider from 'Components/ImageSlider/ImageSlider';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const AdvancedInfoBox = () => {
  const [objectData, setObjectData] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const advancedObject = useSelector(selectAdvancedObject);
  const { fontSize } = useFontSize();

  const getAllItemsImages = async (id) => {
    const currentKind = advancedObject.kind === 'place' ? 'place_image' : 'path_image';
    const currentKind2 = advancedObject.kind === 'place' ? 'place' : 'path';

    try {
      const responseItems = await axios.get(
        `http://127.0.0.1:8000/memo_places/${currentKind}/${currentKind2}=${id}`,
      );

      if (responseItems.data && responseItems.data.length > 0) {
        setCurrentImages(responseItems.data);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (advancedObject.place.length !== 0) {
      setObjectData(advancedObject.place);
      getAllItemsImages(advancedObject.place.id);
    }
  }, [advancedObject.place]);

  useEffect(() => {
    if (advancedObject.trail.length !== 0) {
      setObjectData(advancedObject.trail);
      getAllItemsImages(advancedObject.trail.id);
    }
  }, [advancedObject.trail]);

  const cleanData = () => {
    setObjectData([]);
    setCurrentImages([]);
  };

  return (
    <>
      <BaseModal title={t('common.detailed_info')}>
        {advancedObject.kind === 'place' ? (
          <div className={`px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4 text-${fontSize}-xl`}>
            <div className='p-1 w-2/5 flex flex-col gap-2'>
              <section className='flex flex-col'>
                <span className='italic font-medium text-wrap'>{t('common.latitude')}</span>
                <span>{objectData.lng}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium text-balance'>{t('common.longitude')}</span>
                <span>{objectData.lat}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded')}</span>
                <span>{objectData.creation_date}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type_of')}</span>
                <span>{t(`modal.${objectData.sortof_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type')}</span>
                <span>{t(`modal.${objectData.type_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.period')}</span>
                <span>{t(`modal.${objectData.period_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded_by')}</span>
                <span>{objectData.username}</span>
              </section>
              {objectData.wiki_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.wiki-link')}</span>
                  <a
                    href={objectData.wiki_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    LINK
                  </a>
                </section>
              )}
              {objectData.topic_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.topic-link')}</span>
                  <a
                    href={objectData.topic_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    LINK
                  </a>
                </section>
              )}
            </div>
            <div className='flex flex-col w-3/5 gap-4'>
              <section className='flex justify-center items-center'>
                <section className='flex flex-col mx-0 justify-center w-[32rem] h-[22rem]'>
                  <ImageSlider slides={currentImages} />
                </section>
              </section>
              <section className='text-center font-bold'>{objectData.place_name}</section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.description')}</span>
                <span className='max-h-48 overflow-auto'>{objectData.description}</span>
              </section>
            </div>
          </div>
        ) : (
          <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4 text-xl'>
            <div className='p-1 w-2/5 flex flex-col gap-2'>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded')}</span>
                <span>{objectData.creation_date}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type')}</span>
                <span>{t(`modal.${objectData.type_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.period')}</span>
                <span>{t(`modal.${objectData.period_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded_by')}</span>
                <span>{objectData.username}</span>
              </section>
              {objectData.wiki_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.wiki-link')}</span>
                  <a
                    href={objectData.wiki_link}
                    target='blank'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    LINK
                  </a>
                </section>
              )}
              {objectData.topic_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.topic-link')}</span>
                  <a
                    href={objectData.topic_link}
                    target='blank'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    LINK
                  </a>
                </section>
              )}
            </div>
            <div className='flex flex-col w-3/5 gap-4'>
              <section className='flex justify-center items-center'>
                <section className='flex flex-col mx-0 justify-center w-[32rem] h-[22rem]'>
                  <ImageSlider slides={currentImages} />
                </section>
              </section>
              <section className='text-center font-bold'>{objectData.place_name}</section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.description')}</span>
                <span className='max-h-48 overflow-auto'>{objectData.description}</span>
              </section>
            </div>
          </div>
        )}
        <div className='flex justify-center pt-3 mt-1'>
          <BaseButton
            name={t('common.close')}
            btnBg='red'
            onClick={() => {
              cleanData();
              dispatch(advancedObjectActions.changeIsAdvancedObjectOpen());
            }}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default AdvancedInfoBox;
