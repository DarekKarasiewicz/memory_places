import { useEffect, useState, useRef } from 'react';
import {
  selectAdminAction,
  deletePlaceItem,
  changeUserRole,
  blockUser,
  resetUserPassword,
  unlockUser,
} from 'Redux/adminActionSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BaseButton from 'Base/BaseButton';
import BaseSelect from 'Base/BaseSelect';
import TrashIcon from 'icons/TrashIcon';
import SettingsIcon from 'icons/SettingsIcon';
import PassIcon from 'icons/PassIcon';
import BlockIcon from 'icons/BlockIcon';
import UnlockIcon from 'icons/UnlockIcon';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from 'utils';

function AdminModal({ closeModal }) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminAction);
  const { place_id, place_name, user_id, user_name, current_action } = modalData;
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [iconComponent, setIconComponent] = useState(null);
  const roleRef = useRef(null);
  const [cookies] = useCookies(['user']);

  const role_options = [
    { label: t('admin.content.admin'), value: 'admin' },
    { label: t('admin.content.master_user'), value: 'master' },
    { label: t('admin.content.users'), value: 'user' },
  ];

  useEffect(() => {
    if (current_action === 'place_delete') {
      setTitle(t('admin.common.delete_title'));
      setDesc(t('admin.common.delete_info', { id: place_id, name: place_name }));
      setIconComponent(<TrashIcon className='h-20 w-20' />);
    }

    if (current_action === 'user_block') {
      setTitle(t('admin.common.block_title'));
      setDesc(t('admin.common.block_info', { id: user_id, name: user_name }));
      setIconComponent(<BlockIcon className='h-20 w-20' />);
    }

    if (current_action === 'user_role') {
      setTitle(t('admin.common.role_title'));
      setDesc(t('admin.common.role_info', { id: user_id, name: user_name }));
      setIconComponent(<SettingsIcon className='h-20 w-20' />);
    }

    if (current_action === 'user_pass_reset') {
      setTitle(t('admin.common.pass_res_title'));
      setDesc(t('admin.common.pass_res_info', { id: user_id, name: user_name }));
      setIconComponent(<PassIcon className='h-20 w-20' />);
    }

    if (current_action === 'user_unlock') {
      setTitle(t('admin.common.unlock_title'));
      setDesc(t('admin.common.unlock_info', { id: user_id, name: user_name }));
      setIconComponent(<UnlockIcon className='h-20 w-20' />);
    }
  }, []);

  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div
          className={`m-auto w-[calc(35%)] h-[calc(40%)] rounded-[24px] p-6 bg-secondaryBgColor relative flex flex-col justify-around`}
        >
          <div className='flex flex-col gap-2 justify-center items-center text-textColor'>
            {iconComponent}
            <span className='text-2xl font-bold'>{title}</span>
          </div>
          <div className='flex justify-center items-center my-4'>
            <span className='text-2xl text-center text-textColor'>{desc}</span>
          </div>
          {current_action === 'user_role' && (
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
            <BaseButton name={t('common.cancel')} btnBg='red' onClick={closeModal}></BaseButton>
            {current_action === 'place_delete' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(deletePlaceItem(place_id));
                  registerAppChanges('admin.changes_messages.place_delete', cookies.user, place_id);
                }}
              ></BaseButton>
            )}
            {current_action === 'user_block' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(blockUser(user_id));
                  registerAppChanges('admin.changes_messages.blocked', cookies.user, user_id);
                }}
              ></BaseButton>
            )}
            {current_action === 'user_role' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(changeUserRole(user_id, roleRef.current.value));
                  registerAppChanges('admin.changes_messages.user_role', cookies.user, user_id);
                }}
              ></BaseButton>
            )}
            {current_action === 'user_pass_reset' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(resetUserPassword(user_id));
                  registerAppChanges('admin.changes_messages.reset_pass', cookies.user, user_id);
                }}
              ></BaseButton>
            )}
            {current_action === 'user_unlock' && (
              <BaseButton
                name={t('common.confirm')}
                btnBg='blue'
                onClick={() => {
                  dispatch(unlockUser(user_id));
                  registerAppChanges('admin.changes_messages.unlocked', cookies.user, user_id);
                }}
              ></BaseButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModal;
