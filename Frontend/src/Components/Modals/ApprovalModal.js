import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { approvalModalActions, selectApprovalModal } from 'Redux/approvalModalSlice';
import { userPlacesActions } from 'Redux/userPlacesSlice';
import axios from 'axios';
import { deletePlace } from 'Redux/allMapPlacesSlice';
import { deleteTrail } from 'Redux/allMapTrailsSlice';

import BaseButton from 'Components/Base/BaseButton';
import TrashIcon from 'icons/TrashIcon';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import { registerAppChanges } from 'utils';

function ApprovalModal() {
  const dispatch = useDispatch();
  const approvalData = useSelector(selectApprovalModal);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);

  const handleSumbit = async () => {
    const objectToDelete = approvalData.type === 'place' ? 'places' : 'path';
    const setProperInfoValue = approvalData.type === 'place' ? 'place' : 'trail';

    axios
      .delete(`http://localhost:8000/memo_places/${objectToDelete}/${approvalData.id}/`)
      .then(() => {
        if (approvalData.type === 'place') {
          dispatch(deletePlace(approvalData.id));
          dispatch(userPlacesActions.changeIsPlaceDataShouldReload(true));
        } else {
          dispatch(deleteTrail(approvalData.id));
          dispatch(userPlacesActions.changeIsTrailDataShouldReload(true));
        }

        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('success'));
        registerAppChanges(
          `admin.changes_messages.${setProperInfoValue}_delete`,
          cookies.user,
          approvalData.id,
        );
        dispatch(approvalModalActions.changeIsApprovalModalOpen());
        dispatch(approvalModalActions.clearData());
      })
      .catch(() => {
        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('error'));
      });
  };

  return (
    <>
      <div className='absolute flex w-full h-full top-0 bg-black bg-opacity-80 z-40'>
        <div
          className={`m-auto w-[calc(35%)] h-[calc(40%)] rounded-[24px] p-6 bg-secondaryBgColor relative flex flex-col justify-around`}
        >
          <div className='flex flex-col gap-2 justify-center items-center text-textColor'>
            <TrashIcon className='h-20 w-20' />
            <span className='text-2xl font-bold'>{t('user.delete-title')}</span>
          </div>
          <div className='flex justify-center items-center my-4'>
            <span className='text-2xl text-center text-textColor'>{t('user.delete_info')}</span>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <BaseButton
              name={t('common.cancel')}
              btnBg='red'
              onClick={() => {
                dispatch(approvalModalActions.changeIsApprovalModalOpen());
              }}
            />
            <BaseButton name={t('common.confirm')} btnBg='blue' onClick={() => handleSumbit()} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ApprovalModal;
