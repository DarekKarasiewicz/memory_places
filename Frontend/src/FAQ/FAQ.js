import BaseButton from 'Base/BaseButton';
import BaseModal from 'Base/BaseModal';
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
      <BaseModal title={t('user.FAQ_title')}>
        <div className='flex flex-col gap-4 max-h-[40rem] overflow-auto scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-600 rounded-[24px]  h-auto p-4 relative'>
          <div className='mb-3 text-left'>
            <span className='text-lg break-keep'>{t('user.FAQ_subtitle')}</span>
          </div>
          <div className='flex flex-col gap-2'>
            {FAQ_text.map((item, key) => (
              <FAQItems key={key} title={item.title} desc={item.desc} />
            ))}
          </div>
          <div className='flex justify-center gap-2'>
            <BaseButton name={t('common.close')} btnBg='red' onClick={props.closeModal} />
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default FAQ;
