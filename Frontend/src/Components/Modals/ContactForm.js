import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseModal from 'Components/Base/BaseModal';
import BaseInput from 'Components/Base/BaseInput';
import BaseTextarea from 'Components/Base/BaseTextarea';
import BaseButton from 'Components/Base/BaseButton';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ContactForm(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();
  const [isValidTitle, setIsValidTitle] = useState(null);
  const [isValidDesc, setIsValidDesc] = useState(null);
  const { fontSize } = useFontSize();

  useEffect(() => {
    if (cookies) {
      nameRef.current.value = user.username;
      emailRef.current.value = user.email;
    }
  }, []);

  const validateTitle = (title) => {
    if (title.length > 0) {
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  };

  const validateDescription = (desc) => {
    if (desc.length > 0) {
      setIsValidDesc(true);
    } else {
      setIsValidDesc(false);
    }
  };

  const validateForm = () => {
    if (isValidTitle === true && isValidDesc === true) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      const contact_form_req = {
        email: emailRef.current.value,
        title: titleRef.current.value,
        description: descRef.current.value,
      };

      axios
        .post('http://localhost:8000/memo_places/contact_us/', contact_form_req, {
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
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  return (
    <>
      <BaseModal title={t('user.contact_us')} closeModal={props.closeModal}>
        <div className='flex flex-col px-2 py-4 gap-2'>
          <div className={`text-${fontSize}-base`}>{t('user.contact_info')}</div>
          <div className='flex gap-4'>
            <BaseInput type='text' label={t('common.name')} ref={nameRef} readOnly={true} />
            <BaseInput type='text' label='Email' ref={emailRef} readOnly={true} />
          </div>
          <BaseInput
            type='text'
            label={t('forum.title')}
            ref={titleRef}
            maxLength={50}
            onChange={() => {
              validateTitle(titleRef.current.value);
            }}
            onBlur={() => validateTitle(titleRef.current.value)}
            isValid={isValidTitle}
          />
          <div className='overflow-auto'>
            <BaseTextarea
              rows='10'
              label={t('common.description')}
              ref={descRef}
              secondLabel={t('common.description-max')}
              onChange={() => {
                validateDescription(descRef.current.value);
              }}
              onBlur={() => validateDescription(descRef.current.value)}
              isValid={isValidDesc}
              maxLength={1000}
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
          <div className={`text-center mt-2 text-${fontSize}-base`}>
            {t('user.directly_email')} <strong>info@miejscapamieci.org.pl</strong>
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default ContactForm;
