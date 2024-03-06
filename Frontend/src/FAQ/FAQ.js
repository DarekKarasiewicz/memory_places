import BaseButton from '../Base/BaseButton';
import FAQItems from './FAQItem.js/FAQItems';
import { useTranslation } from 'react-i18next';

function FAQ(props) {
  const { t } = useTranslation();
  const FAQ_text = [
    {
      title: 'Test article 1',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis lorem convallis nibh tincidunt congue quis sed dui. Maecenas ultricies, sapien sed vestibulum congue, dui metus mollis justo, vitae tristique sem mauris quis ipsum. Nulla hendrerit consequat mauris, vel semper risus blandit non. Donec at congue quam. Phasellus maximus, lorem eu varius iaculis, dolor dui gravida leo, at cursus eros sapien nec sem. In eget nisi pharetra, tincidunt dui eget, aliquet elit. Aenean quis nunc ut dolor dapibus tempor. Donec facilisis molestie nisi, id venenatis ligula semper ac.',
    },
    {
      title: 'Test article 2 with longer title to check if it works',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis lorem convallis nibh tincidunt congue quis sed dui. Maecenas ultricies, sapien sed vestibulum congue, dui metus mollis justo, vitae tristique sem mauris quis ipsum. Nulla hendrerit consequat mauris, vel semper risus blandit non.',
    },
    {
      title: 'Test article 3',
      desc: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut vehicula eu nunc a finibus. Nam tempus vestibulum neque quis facilisis. Etiam fermentum velit sit amet blandit varius.',
    },
  ];

  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div className='flex flex-col gap-4 m-auto min-w-[40rem] max-w-2xl max-h-[40rem] overflow-auto scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-600 rounded-[24px] border-2 border-black h-auto p-4 bg-white relative'>
          <div className='flex justify-between items-center h-10 pb-4 border-gray-300 border-b-2'>
            <div className='flex justify-center items-center gap-2 text-xl'>
              <img src='./assets/help_icon.svg' alt='help_icon' className='h-8 w-8' />
              <span className='capitalize font-medium'>{t('user.FAQ_title')}</span>
            </div>
          </div>
          <div className='mb-3 text-center'>
            <span className='text-lg break-keep'>{t('user.FAQ_subtitle')}</span>
          </div>
          <div className='flex flex-col gap-2'>
            {FAQ_text.map((item, key) => (
              <FAQItems key={key} title={item.title} desc={item.desc} />
            ))}
          </div>
          <div className='flex justify-center gap-2'>
            <BaseButton
              name={t('common.close')}
              btnBg='blue'
              onClick={props.closeModal}
            ></BaseButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
