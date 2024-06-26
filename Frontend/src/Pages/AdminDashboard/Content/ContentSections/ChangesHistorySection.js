import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import HistoryTable from '../Tables/HistoryTable';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ChangesHistorySection() {
  const { t } = useTranslation();
  const [changesData, setChangesData] = useState([]);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const accessToken = cookies.user.accessToken;
  const modalData = useSelector(selectAdminData);
  const { isHistoryChanged } = modalData;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchHistoryItems = async () => {
    try {
      const response = await axios.get(`${appPath}/admin_dashboard/changes`, {
        headers: {
          JWT: accessToken,
        },
      });
      const changesItems = response.data
        .map((obj, index) => {
          const target = obj.changes_json.target ? obj.changes_json.target : '';
          return {
            lp: index + 1,
            id: obj.id,
            name: t(obj.changes_json.name, { element_id: target }),
            change_date: obj.creation_date,
            changed_by: obj.username,
            role: t(`user.${obj.changes_json.role}`),
          };
        })
        .sort((a, b) => (a.order > b.order ? 1 : -1));
      setChangesData(changesItems);
      dispatch(adminDataActions.updateIsHistoryChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const changesColumns = [
    {
      header: t('admin.content.lp'),
      accessorKey: 'lp',
    },
    {
      header: 'ID',
      accessorKey: 'id',
      show: false,
    },
    {
      header: t('admin.content.name'),
      accessorKey: 'name',
    },
    {
      header: t('admin.content.changed_date'),
      accessorKey: 'change_date',
    },
    {
      header: t('admin.content.changed_by'),
      accessorKey: 'changed_by',
    },
    {
      header: t('admin.content.role'),
      accessorKey: 'role',
    },
  ];

  useEffect(() => {
    if (isHistoryChanged || changesData.length === 0) {
      fetchHistoryItems();
    }
  }, [isHistoryChanged]);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className={`text-${fontSize}-3xl`}>{t('admin.common.history_title')}</span>
        <span className={`text-${fontSize}-base`}>{t('admin.content.history_info')}</span>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <HistoryTable data={changesData} columns={changesColumns} />
      </div>
    </>
  );
}

export default ChangesHistorySection;
