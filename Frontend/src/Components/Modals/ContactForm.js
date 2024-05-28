import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseModal from 'Components/Base/BaseModal';
import BaseInput from 'Components/Base/BaseInput';
import BaseTextarea from 'Components/Base/BaseTextarea';
import BaseButton from 'Components/Base/BaseButton';

import { registerAppChanges } from 'utils';

function ContactForm(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies) {
      nameRef.current.value = user.username;
      emailRef.current.value = user.email;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact_form_req = {
      email: emailRef.current.value,
      title: titleRef.current.value,
      description: descRef.current.value,
    };

    axios
      .post('http://localhost:8000/memo_places/contact_us', contact_form_req, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        dispatch(notificationModalActions.changeType('success'));
        dispatch(notificationModalActions.changeTitle(t('user.contact_success')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
        registerAppChanges('admin.changes_messages.contact_send', user);
      })
      .catch(() => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  };

  return (
    <>
      <BaseModal title={t('user.contact_us')} closeModal={props.closeModal}>
        <div className='flex flex-col px-2 py-4 gap-2'>
          <div>{t('user.contact_info')}</div>
          <div className='flex gap-4'>
            <BaseInput type='text' label={t('common.name')} ref={nameRef} />
            <BaseInput type='text' label='Email' ref={emailRef} />
          </div>
          <BaseInput type='text' label={t('forum.title')} ref={titleRef} />
          <div className='overflow-auto'>
            <BaseTextarea
              rows='10'
              label={t('common.description')}
              ref={descRef}
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
