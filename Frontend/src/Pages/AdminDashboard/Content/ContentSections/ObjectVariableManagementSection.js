import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import ObjectVariableItem from './ObjectVariableManagementSectionItems/ObjectVariableItem';
import BaseButton from 'Components/Base/BaseButton';
import HelpIcon from 'icons/HelpIcon';
import RefreshIcon from 'icons/RefreshIcon';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ObjectVariableManagementSection() {
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
  const accessToken = cookies.user.accessToken;
  const modalData = useSelector(selectAdminData);
  const { isVariablesChanged } = modalData;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const pushValuesToTranslate = (...elements) => {
    setTranslateValue((prevValues) => [...new Set([...prevValues, ...elements])]);
  };

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`${appPath}/admin_dashboard/sortofs`, {
        headers: {
          JWT: accessToken,
        },
      });
      setSortOf(responseSort.data.sort((a, b) => (a.order > b.order ? 1 : -1)));
      setSortOfBase(responseSort.data);
      pushValuesToTranslate(...responseSort.data.map((item) => item.value));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`${appPath}/admin_dashboard/types`, {
        headers: {
          JWT: accessToken,
        },
      });
      setType(responseType.data);
      setTypeBase(responseType.data);
      pushValuesToTranslate(...responseType.data.map((item) => item.value));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`${appPath}/admin_dashboard/periods`, {
        headers: {
          JWT: accessToken,
        },
      });
      setPeriod(responsePeriod.data);
      setPeriodBase(responsePeriod.data);
      pushValuesToTranslate(...responsePeriod.data.map((item) => item.value));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
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
    if (isVariablesChanged || sortOf.length === 0 || type.length === 0 || period.length === 0) {
      setTranslateValue([]);
      fetchSortOfItems();
      fetchTypeItems();
      fetchPeriodItems();
      dispatch(adminDataActions.updateIsVariablesChanged(false));
    }
  }, [isVariablesChanged]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <span className={`text-${fontSize}-3xl`}>{t('admin.common.var_manage_title')}</span>
          <span className={`text-${fontSize}-base`}>{t('admin.content.variable_info')}</span>
        </div>
        <div className='flex items-center gap-4'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='cursor-pointer relative'
            onClick={() => dispatch(adminDataActions.updateIsVariablesChanged(true))}
          >
            <RefreshIcon className='h-10 w-10' />
          </motion.div>
          <motion.div
            whileHover={{ scale: infoBox ? 1 : 1.05 }}
            className='cursor-pointer relative'
            onClick={() => handleInfoBoxVisibility()}
          >
            <HelpIcon className='h-10 w-10 mr-4' />
            {infoBox && (
              <motion.div
                ref={infoRef}
                variants={parentItem}
                initial='hidden'
                animate='visible'
                className={`absolute w-96 top-12 p-4 right-0 bg-mainBgColor text-textColor shadow-itemShadow flex flex-col gap-2 text-${fontSize}-base`}
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
                <span className='text-red-500'>{t('admin.content.place_var_info3')}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 xl:max-2xl:grid-cols-2 max-xl:grid-cols-1 gap-6 w-full'>
          <ObjectVariableItem
            itemsName='sortof'
            items={sortOf}
            itemsBase={sortOfBase}
            ref={sortofRef}
            error={handleDataError}
          />
          <ObjectVariableItem
            itemsName='type'
            items={type}
            itemsBase={typeBase}
            ref={typeRef}
            error={handleDataError}
          />
          <ObjectVariableItem
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
        />
      </div>
    </>
  );
}

export default ObjectVariableManagementSection;
