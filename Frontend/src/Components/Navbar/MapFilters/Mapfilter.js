import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { filterPlaces } from 'Redux/allMapPlacesSlice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { filterTrails } from 'Redux/allMapTrailsSlice';

import BaseInput from 'Components/Base/BaseInput';
import BaseSelect from 'Components/Base/BaseSelect';
import BaseButton from 'Components/Base/BaseButton';
import FilterIcon from 'icons/FilterIcon';
import CancelIcon from 'icons/CancelIcon';

function MapFilter() {
  const [isActive, setIsActive] = useState(false);
  const [sortOf, setSortOf] = useState([]);
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const [selectedSortOfOption, setSelectedSortOfOption] = useState(0);
  const [selectedTypeOption, setSelectedTypeOption] = useState(0);
  const [selectedPeriodOption, setSelectedPeriodOption] = useState(0);
  const [textValue, setTextValue] = useState('');
  const dispatch = useDispatch();
  const filterPlacesLength = useSelector((state) => state.allMapPlaces.filterItemsLength);
  const filterTrailsLength = useSelector((state) => state.allMapTrails.filterItemsLength);
  const filterItemsLength = filterPlacesLength + filterTrailsLength;
  const { t } = useTranslation();

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/memo_places/sortofs`);
      const sortOfItems = responseSort.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(sortOfItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setSortOf([{ id: 0, label: t('modal.all'), value: 0 }, ...sortOfItems]);
      } else {
        setSortOf(sortOfItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/memo_places/types`);
      const typeItems = responseType.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(typeItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setType([{ id: 0, label: t('modal.all'), value: 0 }, ...typeItems]);
      } else {
        setType(typeItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/memo_places/periods`);
      const periodItems = responsePeriod.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(periodItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setPeriod([{ id: 0, label: t('modal.all'), value: 0 }, ...periodItems]);
      } else {
        setPeriod(periodItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleSelectSortOfChange = (event) => {
    setSelectedSortOfOption(event.target.value);
  };

  const handleSelectTypeChange = (event) => {
    setSelectedTypeOption(event.target.value);
  };

  const handleSelectPeriodChange = (event) => {
    setSelectedPeriodOption(event.target.value);
  };

  const handleTextValueChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleFilterChange = () => {
    dispatch(
      filterPlaces({
        name: textValue,
        sortof: parseInt(selectedSortOfOption),
        type: parseInt(selectedTypeOption),
        period: parseInt(selectedPeriodOption),
      }),
    );
    dispatch(
      filterTrails({
        name: textValue,
        type: parseInt(selectedTypeOption),
        period: parseInt(selectedPeriodOption),
        sortof: parseInt(selectedSortOfOption),
      }),
    );
  };

  useEffect(() => {
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <div className='flex'>
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`h-12 w-12 flex justify-center items-center cursor-pointer ${
          isActive ? 'right-72 absolute mr-3 top-2' : ''
        }`}
        onClick={handleClick}
      >
        {!isActive ? <FilterIcon /> : <CancelIcon />}
      </motion.div>
      {isActive && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute top-0 right-0 flex gap-2 w-72 h-screen p-3 bg-mainBgColor text-textColor rounded-s-lg z-10 shadow-xl'
        >
          <div className='flex flex-col gap-y-4 justify-start items-center w-full'>
            <div className='text-2xl border-b-2 border-textColor p-2 w-1/2 text-center'>
              <span>{t('common.filter1')}</span>
              <span className='font-semibold'>{' (' + filterItemsLength + ')'}</span>
            </div>
            <div className='flex flex-col gap-4 mb-2'>
              <BaseInput
                type='text'
                label={t('common.name')}
                name={t('common.name')}
                value={textValue}
                onChange={handleTextValueChange}
              />
              <BaseSelect
                label={t('common.type_of')}
                name={t('common.type_of')}
                value={selectedSortOfOption}
                options={sortOf}
                onChange={handleSelectSortOfChange}
              />
              <BaseSelect
                label={t('common.type')}
                name={t('common.type')}
                value={selectedTypeOption}
                options={type}
                onChange={handleSelectTypeChange}
              />
              <BaseSelect
                label={t('common.period')}
                name={t('common.period')}
                value={selectedPeriodOption}
                options={period}
                onChange={handleSelectPeriodChange}
              />
            </div>
            <BaseButton onClick={handleFilterChange} btnBg='blue' name={t('common.filter2')} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MapFilter;
