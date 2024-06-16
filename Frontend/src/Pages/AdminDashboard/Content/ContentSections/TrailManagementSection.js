import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import AdminTileStat from '../Charts/AdminTileStat';
import TrailTable from '../Tables/TrailTable';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function TrailManagementSection() {
  const { t } = useTranslation();
  const [trails, setTrails] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isTrailsChanged } = modalData;
  const { fontSize } = useFontSize();
  const [cookies] = useCookies(['user']);
  const accessToken = cookies.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchTrailItems = async () => {
    try {
      const response = await axios.get(`${appPath}/admin_dashboard/path`, {
        headers: {
          JWT: accessToken,
        },
      });
      const modifiedTrailsData = response.data.map((obj, index) => ({
        ...obj,
        lp: index + 1,
      }));

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthTrails = modifiedTrailsData.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthTrails = modifiedTrailsData.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      setTrails(modifiedTrailsData);
      setStatistics((statistics) => ({ ...statistics, ['allTrails']: modifiedTrailsData.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['previousMonthTrails']: sumOfPreviousMonthTrails.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthTrails']: sumOfCurrentMonthTrails.length,
      }));
      dispatch(adminDataActions.updateIsTrailsChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (isTrailsChanged || trails.length === 0) {
      fetchTrailItems();
    }
  }, [isTrailsChanged]);

  const trailsColumns = [
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
      accessorKey: 'path_name',
    },
    {
      header: t('admin.content.type'),
      accessorKey: 'type_value',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t(`modal.${props.getValue()}`)}</span>;
        } else {
          return <span>{t('modal.no_data')}</span>;
        }
      },
    },
    {
      header: t('admin.content.period'),
      accessorKey: 'period_value',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t(`modal.${props.getValue()}`)}</span>;
        } else {
          return <span>{t('modal.no_data')}</span>;
        }
      },
    },
    {
      header: t('admin.content.created_by'),
      accessorKey: 'username',
    },
    {
      header: t('admin.content.created'),
      accessorKey: 'creation_date',
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className={`text-${fontSize}-3xl`}>{t('admin.common.trail_manage_title')}</span>
        <span className={`text-${fontSize}-base`}>{t('admin.content.all_trails_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 max-xl:grid-cols-2 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_trails')}
            value={statistics.allTrails}
            icon='places'
          />
          <AdminTileStat
            title={t('admin.content.previous_trails')}
            value={statistics.previousMonthTrails}
            icon='mapPin'
          />
          <AdminTileStat
            title={t('admin.content.current_trails')}
            value={statistics.currentMonthTrails}
            icon='mapPin'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <TrailTable data={trails} columns={trailsColumns} />
        </div>
      </div>
    </>
  );
}

export default TrailManagementSection;
