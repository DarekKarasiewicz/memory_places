import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import PlaceVariableItem from './PlaceVariableManagementSectionItems/PlaceVariableItem';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import BaseButton from 'Base/BaseButton';
import HelpIcon from 'icons/HelpIcon';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from 'utils';

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
  const [infoBox, setInfoBox] = useState(false);
  const infoRef = useRef(null);
  const [translateValue, setTranslateValue] = useState([]);
  const [cookies] = useCookies(['user']);

  const pushValuesToTranslate = (...elements) => {
    setTranslateValue((prevValues) => [...new Set([...prevValues, ...elements])]);
  };

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/admin_dashboard/sortofs`);
      setSortOf(responseSort.data);
      setSortOfBase(responseSort.data);
      pushValuesToTranslate(...responseSort.data.map((item) => item.value));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/admin_dashboard/types`);
      setType(responseType.data);
      setTypeBase(responseType.data);
      pushValuesToTranslate(...responseType.data.map((item) => item.value));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/admin_dashboard/periods`);
      setPeriod(responsePeriod.data);
      setPeriodBase(responsePeriod.data);
      pushValuesToTranslate(...responsePeriod.data.map((item) => item.value));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataError = (data) => {
    setError(data);
  };

  const handleInfoBoxVisibility = () => {
    setInfoBox((infoBox) => !infoBox);
  };

  const parentItem = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.2,
      },
    },
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
      registerAppChanges('admin.changes_messages.variables_changed', cookies.user);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [infoRef]);

  useEffect(() => {
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <span className='text-3xl'>{t('admin.common.var_manage_title')}</span>
          <span className='text-md'>{t('admin.content.variable_info')}</span>
        </div>
        <motion.div
          whileHover={{ scale: infoBox ? 1 : 1.05 }}
          className='cursor-pointer relative'
          onClick={() => handleInfoBoxVisibility()}
        >
          <HelpIcon className='h-12 w-12 mr-4' />
          {infoBox && (
            <motion.div
              ref={infoRef}
              variants={parentItem}
              initial='hidden'
              animate='visible'
              className='absolute w-96 top-12 p-4 right-0 bg-mainBgColor text-textColor shadow-itemShadow flex flex-col gap-2'
            >
              <span>{t('admin.content.place_var_info')}</span>
              <span>{t('admin.content.place_var_info2')}</span>
              <span>
                {translateValue.map((value, index) => (
                  <React.Fragment key={index}>
                    {value}
                    {index !== translateValue.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </span>
            </motion.div>
          )}
        </motion.div>
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
        <BaseButton
          name={t('admin.content.save_changes')}
          btnBg='blue'
          onClick={() => saveAllChanges()}
        ></BaseButton>
      </div>
    </>
  );
}

export default PlaceVariableManagementSection;
