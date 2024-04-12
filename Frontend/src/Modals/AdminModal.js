import { selectAdminDelete, deletePlaceItem } from '../Redux/adminDeleteSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import BaseButton from '../Base/BaseButton';
import { useTranslation } from 'react-i18next';
import TrashIcon from '../icons/TrashIcon';

function AdminModal({ closeModal }) {
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminDelete);
  const { place_id, place_name } = modalData;
  const { t } = useTranslation();

  return (
    <>
      <div className='absolute flex w-full h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div
          className={`m-auto w-[calc(35%)] h-[calc(40%)] rounded-[24px] shadow-itemShadow p-6 bg-secondaryBgColor relative flex flex-col justify-around`}
        >
          <div className='flex flex-col gap-2 justify-center items-center text-textColor'>
            <TrashIcon className='h-20 w-20' />
            <span className='text-2xl font-bold'>Usuwanie miejsca pamięci</span>
          </div>
          <div className='flex justify-center items-center my-4'>
            <span className='text-2xl text-textColor'>
              Czy napewno chcesz usunąć miejsce o <br /> ID: <strong>{place_id}</strong> i nazwie:{' '}
              <strong>{place_name}</strong>
            </span>
          </div>
          <div className='flex justify-center gap-8'>
            <BaseButton name={t('common.cancel')} btnBg='red' onClick={closeModal}></BaseButton>
            <BaseButton
              name={t('common.confirm')}
              btnBg='blue'
              onClick={() => dispatch(deletePlaceItem(place_id))}
            ></BaseButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModal;
