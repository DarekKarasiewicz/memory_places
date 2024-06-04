import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, selectAdminAction } from 'Redux/adminActionSlice';
import { adminDataActions } from 'Redux/adminDataSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import BaseModal from 'Components/Base/BaseModal';
import BaseInput from 'Components/Base/BaseInput';
import BaseTextarea from 'Components/Base/BaseTextarea';
import BaseButton from 'Components/Base/BaseButton';

import { registerAppChanges } from 'utils';

function AdminForumActionModal() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const dispatch = useDispatch();
  const [isValidTitle, setIsValidTitle] = useState(null);
  const [isValidDesc, setIsValidDesc] = useState(null);
  const modalAdmin = useSelector(selectAdminAction);
  const [actionTitle, setActionTitle] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const closeModal = () => {
    dispatch(adminActions.changeIsAdminForumModalOpen(false));
  };

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

  const validateFormPost = () => {
    if (isValidTitle === true && isValidDesc === true) {
      return true;
    }
    return false;
  };

  const validateFormComment = () => {
    if (isValidDesc === true) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (modalAdmin.forum_kind_type === 'post') {
      const getPostItem = async (postItem) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/memo_places_forum/post/pk=${postItem}`,
          );
          titleRef.current.value = response.data.title;
          descRef.current.value = response.data.content;
          validateTitle(titleRef.current.value);
          validateDescription(descRef.current.value);
        } catch (error) {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        }
      };

      if (modalAdmin.forum_modal_action === 'edit') {
        setActionTitle(t('admin.common.memo_post_edit'));
      }

      if (modalAdmin.forum_modal_action === 'view') {
        setActionTitle(t('admin.common.memo_post_view'));
        setIsReadOnly(true);
      }

      getPostItem(modalAdmin.post_id);
    } else {
      const getCommentItem = async (commentItem) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/memo_places_forum/comment/pk=${commentItem}`,
          );
          descRef.current.value = response.data.content;
          validateDescription(descRef.current.value);
        } catch (error) {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        }
      };

      if (modalAdmin.forum_modal_action === 'edit') {
        setActionTitle(t('admin.common.memo_comment_edit'));
      }

      if (modalAdmin.forum_modal_action === 'view') {
        setActionTitle(t('admin.common.memo_comment_view'));
        setIsReadOnly(true);
      }

      getCommentItem(modalAdmin.comment_id);
    }
  }, [modalAdmin.forum_modal_action]);

  const handleSubmit = () => {
    if (modalAdmin.forum_kind_type === 'post') {
      if (validateFormPost) {
        axios
          .put(`http://127.0.0.1:8000/memo_places_forum/post/${modalAdmin.post_id}/`, {
            title: titleRef.current.value,
            content: descRef.current.value,
          })
          .then(() => {
            dispatch(adminActions.changeIsAdminForumModalOpen(false));
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            dispatch(adminDataActions.updateIsPostsChanged(true));
            registerAppChanges('admin.changes_messages.post_edit', user, modalAdmin.post_id);
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
          });
      } else {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      }
    } else {
      if (validateFormComment) {
        axios
          .put(`http://127.0.0.1:8000/memo_places_forum/comment/${modalAdmin.comment_id}/`, {
            content: descRef.current.value,
          })
          .then(() => {
            dispatch(adminActions.changeIsAdminForumModalOpen(false));
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            dispatch(adminDataActions.updateIsCommentsChanged(true));
            registerAppChanges(
              'admin.changes_messages.comment_edited',
              user,
              modalAdmin.comment_id,
            );
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
          });
      } else {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      }
    }
  };

  return (
    <>
      <BaseModal title={actionTitle} closeModal={closeModal}>
        <div className='flex flex-col px-2 py-4 gap-2'>
          {modalAdmin.forum_kind_type && modalAdmin.forum_kind_type === 'post' && (
            <BaseInput
              type='text'
              label={t('forum.title')}
              ref={titleRef}
              maxLength={64}
              onChange={() => {
                validateTitle(titleRef.current.value);
              }}
              onBlur={() => validateTitle(titleRef.current.value)}
              readOnly={isReadOnly}
            />
          )}
          <div>
            <BaseTextarea
              rows='10'
              width=''
              label={'Zawartość'}
              ref={descRef}
              maxLength={1000}
              onChange={() => {
                validateDescription(descRef.current.value);
              }}
              onBlur={() => validateDescription(descRef.current.value)}
              secondLabel={t('common.max_length', { value: 1000 })}
              readOnly={isReadOnly}
            />
          </div>
          <div className='flex justify-center mt-2 gap-4'>
            <BaseButton name={t('common.cancel')} btnBg='red' onClick={() => closeModal()} />
            {modalAdmin.forum_modal_action !== 'view' && (
              <BaseButton
                name={t('admin.common.add')}
                btnBg='blue'
                onClick={() => handleSubmit()}
              />
            )}
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default AdminForumActionModal;
