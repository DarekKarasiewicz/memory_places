import { useTranslation } from 'react-i18next';
import BaseModal from '../../Base/BaseModal';
import BaseButton from '../../Base/BaseButton';
import ImageSlider from '../../ImageSlider/ImageSlider';

const AdvancedInfoBox = (props) => {
  const receivedData = props.data;
  const { t } = useTranslation();

  // temp solution when images not provide yet
  const sliderData = [
    {
      image: 'https://placehold.co/300x200/000000/FFFFFF/png',
      alt: 'Example alt 1',
    },
    {
      image: 'https://placehold.co/400x400/000000/FF0000/png',
      alt: 'Example alt 2',
    },
    {
      image: 'https://placehold.co/500x400/000000/0000FF/png',
      alt: 'Example alt 3',
    },
  ];

  return (
    <>
      <BaseModal title={t('common.detailed_info')} closeModal={props.closeModal}>
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
              <span>{receivedData.found_date}</span>
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
            <section className='flex flex-col justify-center w-[32rem] h-[22rem]'>
              <ImageSlider slides={sliderData} />
            </section>
            <section className='text-center font-bold'>{receivedData.place_name}</section>
            <section className='flex flex-col'>
              <span className='italic font-medium'>{t('common.description')}</span>
              <span className='max-h-48 overflow-auto'>{receivedData.description}</span>
            </section>
          </div>
        </div>
        <div className='flex justify-center pt-3 mt-1'>
          <BaseButton name={t('common.close')} btnBg='red' onClick={props.closeInfo}></BaseButton>
        </div>
      </BaseModal>
    </>
  );
};

export default AdvancedInfoBox;
