import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';

function ContactForm(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const contact_form_req = {
      email: emailRef.current.value,
      title: titleRef.current.value,
      description: descRef.current.value,
    };

    axios
      .post('http://localhost:8000/memo_places/contact_us', contact_form_req, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        alert(t('user.contact_success'));
      })
      .error((error) => {
        alert(t('common.axios_warning'));
      });
  };

  return (
    <>
      <BaseModal title={t('user.contact_us')} closeModal={props.closeModal}>
        <div className='flex flex-col px-2 py-4 gap-2'>
          <div>{t('user.contact_info')}</div>
          <div className='flex gap-4'>
            <BaseInput
              type='text'
              label={t('common.name')}
              value={user.username ? user.username : ''}
            />
            <BaseInput type='text' label='Email' value={user.email ? user.email : ''} />
          </div>
          <div className='overflow-auto'>
            <BaseTextarea
              rows='10'
              label={t('common.description')}
              secondLabel={t('common.description-max')}
            />
          </div>
          <div className='flex justify-center mt-2 gap-4'>
            <BaseButton
              name={t('common.cancel')}
              btnBg='red'
              onClick={() => dispatch(modalsActions.changeIsContactFormOpen())}
            />
            <BaseButton name={t('common.send')} btnBg='blue' onClick={handleSubmit} />
          </div>
          <div className='text-center mt-2'>
            {t('user.directly_email')} <strong>{t('log_reg_form.example_mail')}</strong>
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default ContactForm;
