import { useTranslation } from 'react-i18next';

import BaseButton from 'Components/Base/BaseButton';
import BaseModal from 'Components/Base/BaseModal';
import FAQItems from './FAQItem.js/FAQItems';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function FAQ(props) {
  const { t } = useTranslation();
  const { fontSize } = useFontSize();

  const FAQ_text = [
    {
      title: t('common.faq1_title'),
      desc: t('common.faq1_info'),
    },
    {
      title: t('common.faq2_title'),
      desc: t('common.faq2_info'),
    },
    {
      title: t('common.faq3_title'),
      desc: t('common.faq3_info'),
    },
    {
      title: t('common.faq4_title'),
      desc: t('common.faq4_info'),
    },
    {
      title: t('common.faq5_title'),
      desc: t('common.faq5_info'),
    },
  ];

  return (
    <>
      <BaseModal title={t('user.FAQ_title')}>
        <div className='flex flex-col gap-4 max-h-[40rem] overflow-auto rounded-[24px] h-auto p-4 relative'>
          <div className='mb-3 text-left'>
            <span className={`text-${fontSize}-lg break-keep`}>{t('user.FAQ_subtitle')}</span>
          </div>
          <div className='flex flex-col gap-4'>
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
