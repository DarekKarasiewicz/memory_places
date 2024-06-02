import { useEffect, useState, useRef } from 'react';
import {
  selectAdminAction,
  deletePlaceItem,
  changeUserRole,
  blockUser,
  resetUserPassword,
  unlockUser,
  deletePostItem,
  deleteCommentItem,
} from 'Redux/adminActionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import BaseButton from 'Components/Base/BaseButton';
import BaseSelect from 'Components/Base/BaseSelect';
import TrashIcon from 'icons/TrashIcon';
import SettingsIcon from 'icons/SettingsIcon';
import PassIcon from 'icons/PassIcon';
import BlockIcon from 'icons/BlockIcon';
import UnlockIcon from 'icons/UnlockIcon';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function AdminModal({ closeModal }) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminAction);
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [iconComponent, setIconComponent] = useState(null);
  const roleRef = useRef(null);
  const [cookies] = useCookies(['user']);
  const { fontSize } = useFontSize();

  const role_options = [
    { label: t('admin.content.admin'), value: 'admin' },
    { label: t('admin.content.master_user'), value: 'master' },
    { label: t('admin.content.users'), value: 'user' },
  ];

  useEffect(() => {
    if (modalData.current_action === 'place_delete') {
      setTitle(t('admin.common.delete_title'));
      setDesc(
        t('admin.common.delete_info', { id: modalData.place_id, name: modalData.place_name }),
      );
      setIconComponent(<TrashIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'user_block') {
      setTitle(t('admin.common.block_title'));
      setDesc(t('admin.common.block_info', { id: modalData.user_id, name: modalData.user_name }));
      setIconComponent(<BlockIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'user_role') {
      setTitle(t('admin.common.role_title'));
      setDesc(t('admin.common.role_info', { id: modalData.user_id, name: modalData.user_name }));
      setIconComponent(<SettingsIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'user_pass_reset') {
      setTitle(t('admin.common.pass_res_title'));
      setDesc(
        t('admin.common.pass_res_info', { id: modalData.user_id, name: modalData.user_name }),
      );
      setIconComponent(<PassIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'user_unlock') {
      setTitle(t('admin.common.unlock_title'));
      setDesc(t('admin.common.unlock_info', { id: modalData.user_id, name: modalData.user_name }));
      setIconComponent(<UnlockIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'post_delete') {
      setTitle(t('admin.common.delete_post_title'));
      setDesc(
        t('admin.common.delete_post_info', { id: modalData.post_id, title: modalData.post_title }),
      );
      setIconComponent(<TrashIcon className='h-20 w-20' />);
    }

    if (modalData.current_action === 'comment_delete') {
      setTitle(t('admin.common.comment_title'));
      setDesc(t('admin.common.comment_info', { id: modalData.comment_id }));
      setIconComponent(<TrashIcon className='h-20 w-20' />);
    }
  }, []);

  return (
    <>
      <div className='absolute flex w-full h-full top-0 bg-black bg-opacity-80 z-40'>
        <div
          className={`m-auto w-[calc(35%)] h-[calc(40%)] rounded-[24px] p-6 bg-secondaryBgColor relative flex flex-col justify-around`}
        >
          <div className='flex flex-col gap-2 justify-center items-center text-textColor'>
            {iconComponent}
            <span className={`text-${fontSize}-2xl font-bold`}>{title}</span>
          </div>
          <div className='flex justify-center items-center my-4'>
            <span className={`text-${fontSize}-2xl text-center text-textColor`}>{desc}</span>
          </div>
          {modalData.current_action === 'user_role' && (
            <div className='flex justify-center items-center mb-8'>
              <div className='w-1/2'>
                <BaseSelect
                  disabledLabel={true}
                  label={t('admin.content.role')}
                  name={t('admin.content.role')}
                  options={role_options}
                  ref={roleRef}
                  onChange={() => roleRef.current.value}
                />
              </div>
            </div>
          )}
          <div className='flex justify-center gap-8'>
            <BaseButton name={t('common.cancel')} btnBg='red' onClick={closeModal} />
            {modalData.current_action === 'place_delete' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(deletePlaceItem(modalData.place_id));
                  registerAppChanges(
                    'admin.changes_messages.place_delete',
                    cookies.user,
                    modalData.place_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'user_block' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(blockUser(modalData.user_id));
                  registerAppChanges(
                    'admin.changes_messages.blocked',
                    cookies.user,
                    modalData.user_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'user_role' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(changeUserRole(modalData.user_id, roleRef.current.value));
                  registerAppChanges(
                    'admin.changes_messages.user_role',
                    cookies.user,
                    modalData.user_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'user_pass_reset' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(resetUserPassword(modalData.user_id));
                  registerAppChanges(
                    'admin.changes_messages.reset_pass',
                    cookies.user,
                    modalData.user_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'user_unlock' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(unlockUser(modalData.user_id));
                  registerAppChanges(
                    'admin.changes_messages.unlocked',
                    cookies.user,
                    modalData.user_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'post_delete' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(deletePostItem(modalData.post_id));
                  registerAppChanges(
                    'admin.changes_messages.post_deleted',
                    cookies.user,
                    modalData.post_id,
                  );
                }}
              />
            )}
            {modalData.current_action === 'comment_delete' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(deleteCommentItem(modalData.comment_id));
                  registerAppChanges(
                    'admin.changes_messages.comment_deleted',
                    cookies.user,
                    modalData.comment_id,
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModal;
