import BaseModal from 'Base/BaseModal';
import BaseInput from 'Base/BaseInput';
import BaseTextarea from 'Base/BaseTextarea';
import BaseButton from 'Base/BaseButton';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { registerAppChanges } from 'utils';
import { forumDataActions, selectForumData } from 'Redux/forumDataSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

function ForumPostModal(props) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();
  const [isValidTitle, setIsValidTitle] = useState(null);
  const [isValidDesc, setIsValidDesc] = useState(null);
  const forumData = useSelector(selectForumData);

  const closeModal = () => {
    dispatch(modalsActions.changeIsForumPostModalOpen());
  };

  const validateTitle = (title) => {
    if (titleRef.current.length > 0) {
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  };

  const validateDescription = (desc) => {
    if (descRef.current.length > 0) {
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

    console.log(forumData.place_id);

    // if (isFormValid) {
    //   axios
    //     .post(`http://127.0.0.1:8000/memo_places_forum/post/`, {
    //       user: user.user_id,
    //       place_id: forumData.place_id,
    //       title: titleRef.current.value,
    //       content: descRef.current.value
    //     })
    //     .then((response) => {
    //       dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
    //       dispatch(confirmationModalActions.changeType('success'));
    //       // registerAppChanges('Utworzono post o ID', user, addPlaceData.place_name);
    //     })
    //     .catch(() => {
    //       dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
    //       dispatch(confirmationModalActions.changeType('error'));
    //     });
    // } else {
    //   dispatch(notificationModalActions.changeType('alert'));
    //   dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
    //   dispatch(notificationModalActions.changeIsNotificationModalOpen());
    // }
  };

  return (
    <>
      <BaseModal title='Dodawanie postu' closeModal={closeModal}>
        <div className='flex flex-col px-2 py-4 gap-2'>
          <BaseInput
            type='text'
            label={t('forum.title')}
            onChange={() => {
              validateTitle(titleRef.current.value);
            }}
            onBlur={() => validateTitle(titleRef.current.value)}
            ref={titleRef}
          />
          <div className='overflow-auto'>
            <BaseTextarea
              rows='10'
              label={t('common.description')}
              ref={descRef}
              onChange={() => {
                validateDescription(descRef.current.value);
              }}
              onBlur={() => validateDescription(descRef.current.value)}
              secondLabel={t('common.description-max')}
            />
          </div>
          <div className='flex justify-center mt-2 gap-4'>
            <BaseButton name={t('common.cancel')} btnBg='red' onClick={() => closeModal()} />
            {/* <BaseButton name={t('admin.common.add')} btnBg='blue' onClick={() => handleSubmit()} /> */}
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default ForumPostModal;
