import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import BaseButton from '../../Base/BaseButton';
import ImageSlider from '../../ImageSlider/ImageSlider';

const AdvancedInfoBox = (props) => {
  const receivedData = props.data;
  const lang = i18next.language;
  const { t } = useTranslation();

  // temp solution when images not provide yet
  const SliderData = [
    {
      image: 'https://placehold.co/600x400/000000/FFFFFF/png',
      alt: 'Example alt 1',
    },
    {
      image: 'https://placehold.co/600x400/000000/FF0000/png',
      alt: 'Example alt 2',
    },
    {
      image: 'https://placehold.co/600x400/000000/0000FF/png',
      alt: 'Example alt 3',
    },
  ];

  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-100'>
        <div
          className={`m-auto min-w-sm max-w-xl rounded-[24px] border-2 border-black h-auto p-4 bg-white relative break-all`}
        >
          <div>
            <div className='flex flex-col'>
              <section className='flex flex-col justify-center'>
                <ImageSlider slides={SliderData} />
              </section>
              <section className='flex flex-col my-3'>
                <span className='text-center font-bold'>{receivedData.place_name}</span>
                <span className='flex flex-col'>
                  <span className='italic font-medium'>{t('common.description')}</span>
                  <span className='max-h-48 overflow-auto'>{receivedData.description}</span>
                </span>
                <section className='flex flex-row'>
                  <span className={`flex w-1/2 ${lang === 'pl' ? 'flex-col' : ''}`}>
                    <span className='italic font-medium'>{t('common.latitude')} </span>
                    <span>{receivedData.lng}</span>
                  </span>
                  <span className={`flex w-1/2 ${lang === 'pl' ? 'flex-col' : ''}`}>
                    <span className='italic font-medium text-balance'>{t('common.longitude')}</span>{' '}
                    <span>{receivedData.lat}</span>
                  </span>
                </section>
                <section className='flex flex-row'>
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.created')}</span>{' '}
                    <span>{receivedData.creation_date}</span>
                  </span>
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.founded')}</span>{' '}
                    <span>{receivedData.found_date}</span>
                  </span>
                </section>
                <section className='flex flex-row'>
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.type_of')}</span>{' '}
                    <span>{receivedData.sortof}</span>
                  </span>
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.type')}</span>{' '}
                    <span>{receivedData.type}</span>
                  </span>
                </section>
                <section className='flex flex-row'>
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.period')}</span>{' '}
                    <span>{receivedData.period}</span>
                  </span>
                  {/* TODO should be username */}
                  <span className='w-1/2'>
                    <span className='italic font-medium'>{t('common.founded_by')}</span>{' '}
                    <span>{receivedData.user}</span>
                  </span>
                </section>
                <section className='flex flex-row'>
                  <span className='flex w-1/2 flex-col'>
                    <span className='italic font-medium'>{t('common.wiki-link')}</span>{' '}
                    <span>
                      <a
                        href='#'
                        target='blank'
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        WILL BE LINK
                      </a>
                    </span>
                  </span>
                  <span className='flex w-1/2 flex-col'>
                    <span className='italic font-medium'>{t('common.topic-link')}</span>{' '}
                    <span>
                      <a
                        href='#'
                        target='blank'
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        WILL BE LINK
                      </a>
                    </span>
                  </span>
                </section>
              </section>
              <section className='mx-auto'>
                <BaseButton name='close info' onClick={props.closeInfo}></BaseButton>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedInfoBox;
