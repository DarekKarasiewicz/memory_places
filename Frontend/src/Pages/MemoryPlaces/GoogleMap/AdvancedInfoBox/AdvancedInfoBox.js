import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import BaseModal from 'Components/Base/BaseModal';
import BaseButton from 'Components/Base/BaseButton';
import ImageSlider from 'Components/ImageSlider/ImageSlider';

const AdvancedInfoBox = (props) => {
  const [receivedData, setReceivedData] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getAllItemsImages = async (kind, id) => {
    const currentKind = kind === 'place' ? 'place_image' : 'path_image';
    const currentKind2 = kind === 'place' ? 'place' : 'path';

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
    if (Object.keys(props.placeData).length !== 0) {
      setReceivedData(props.placeData);
      getAllItemsImages('place', props.placeData.id);
    }
  }, [props.placeData]);

  useEffect(() => {
    if (Object.keys(props.trailData).length !== 0) {
      setReceivedData(props.trailData);
      getAllItemsImages('trail', props.trailData.id);
    }
  }, [props.trailData]);

  const cleanData = () => {
    setReceivedData([]);
    setCurrentImages([]);
  };

  return (
    <>
      <BaseModal title={t('common.detailed_info')} closeModal={props.closeModal}>
        {props.kind === 'place' ? (
          <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4 text-xl'>
            <div className='p-1 w-2/5 flex flex-col gap-2'>
              <section className='flex flex-col'>
                <span className='italic font-medium text-wrap'>{t('common.latitude')}</span>
                <span className='text-xl'>{receivedData.lng}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium text-balance'>{t('common.longitude')}</span>{' '}
                <span>{receivedData.lat}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded')}</span>{' '}
                <span>{receivedData.creation_date}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type_of')}</span>{' '}
                <span>{t(`modal.${receivedData.sortof_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type')}</span>{' '}
                <span>{t(`modal.${receivedData.type_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.period')}</span>{' '}
                <span>{t(`modal.${receivedData.period_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                <span>{receivedData.username}</span>
              </section>
              {receivedData.wiki_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.wiki-link')}</span>{' '}
                  <a
                    href={receivedData.wiki_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    LINK
                  </a>
                </section>
              )}
              {receivedData.topic_link && (
                <section className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.topic-link')}</span>{' '}
                  <a
                    href={receivedData.topic_link}
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
              <section className='text-center font-bold'>{receivedData.place_name}</section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.description')}</span>
                <span className='max-h-48 overflow-auto'>{receivedData.description}</span>
              </section>
            </div>
          </div>
        ) : (
          <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4 text-xl'>
            <div className='p-1 w-2/5 flex flex-col gap-2'>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded')}</span>{' '}
                <span>{receivedData.creation_date}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.type')}</span>{' '}
                <span>{t(`modal.${receivedData.type_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.period')}</span>{' '}
                <span>{t(`modal.${receivedData.period_value}`)}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                <span>{receivedData.username}</span>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.wiki-link')}</span>{' '}
                <a
                  href={receivedData.wiki_link}
                  target='blank'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  LINK
                </a>
              </section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.topic-link')}</span>{' '}
                <a
                  href={receivedData.topic_link}
                  target='blank'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  LINK
                </a>
              </section>
            </div>
            <div className='flex flex-col w-3/5 gap-4'>
              <section className='flex justify-center items-center'>
                <section className='flex flex-col mx-0 justify-center w-[32rem] h-[22rem]'>
                  <ImageSlider slides={currentImages} />
                </section>
              </section>
              <section className='text-center font-bold'>{receivedData.place_name}</section>
              <section className='flex flex-col'>
                <span className='italic font-medium'>{t('common.description')}</span>
                <span className='max-h-48 overflow-auto'>{receivedData.description}</span>
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
              props.closeInfo();
            }}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default AdvancedInfoBox;
