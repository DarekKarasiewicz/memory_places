import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PlaceVariableItem from './PlaceVariableManagementSectionItems/PlaceVariableItem';
import { confirmationModalActions } from '../../../Redux/confirmationModalSlice';

function PlaceVariableManagementSection() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sortOf, setSortOf] = useState([]);
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const [sortOfBase, setSortOfBase] = useState([]);
  const [typeBase, setTypeBase] = useState([]);
  const [periodBase, setPeriodBase] = useState([]);
  const sortofRef = useRef(null);
  const typeRef = useRef(null);
  const periodRef = useRef(null);
  const [error, setError] = useState(false);

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/admin_dashboard/sortofs`);
      setSortOf(responseSort.data);
      setSortOfBase(responseSort.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/admin_dashboard/types`);
      setType(responseType.data);
      setTypeBase(responseType.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/admin_dashboard/periods`);
      setPeriod(responsePeriod.data);
      setPeriodBase(responsePeriod.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataError = (data) => {
    setError(data);
  };

  const saveAllChanges = () => {
    sortofRef.current.postItems();
    typeRef.current.postItems();
    periodRef.current.postItems();

    dispatch(confirmationModalActions.changeIsConfirmationModalOpen());

    if (error) {
      dispatch(confirmationModalActions.changeType('error'));
    } else {
      dispatch(confirmationModalActions.changeType('success'));
    }
  };

  useEffect(() => {
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.var_manage_title')}</span>
        <span className='text-md'>{t('admin.content.variable_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full'>
          <PlaceVariableItem
            itemsName='sortof'
            items={sortOf}
            itemsBase={sortOfBase}
            ref={sortofRef}
            error={handleDataError}
          />
          <PlaceVariableItem
            itemsName='type'
            items={type}
            itemsBase={typeBase}
            ref={typeRef}
            error={handleDataError}
          />
          <PlaceVariableItem
            itemsName='period'
            items={period}
            itemsBase={periodBase}
            ref={periodRef}
            error={handleDataError}
          />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button
          className='w-32 normal-case bg-blue-600 leading-6 p-2 shadow-lg text-white font-medium rounded-lg'
          onClick={() => saveAllChanges()}
        >
          {t('admin.content.save_changes')}
        </button>
      </div>
    </>
  );
}

export default PlaceVariableManagementSection;
