import AdminTileStat from '../Charts/AdminTileStat';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import TrailTable from '../Tables/TrailTable';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

function TrailManagementSection() {
  const { t } = useTranslation();
  const [trails, setTrails] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isTrailsChanged } = modalData;

  const fetchTrailItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/path`);
      console.log(response.data);

      // const modifiedTrailsData = response.data.filter((item) => item.verified === true);

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthTrails = response.data.filter(
        (item) => getItemDate(item.found_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthTrails = response.data.filter(
        (item) => getItemDate(item.found_date) === previousMonthDate,
      );

      // const sumOfCurrentMonthTrails = modifiedTrailsData.filter(
      //   (item) => getItemDate(item.found_date) === new Date().getMonth(),
      // );

      // const sumOfPreviousMonthTrails = modifiedTrailsData.filter(
      //   (item) => getItemDate(item.found_date) === previousMonthDate,
      // );

      // setTrails(modifiedTrailsData);
      setTrails(response.data);
      // setStatistics((statistics) => ({ ...statistics, ['allTrails']: modifiedPlaceData.length }));
      setStatistics((statistics) => ({ ...statistics, ['allTrails']: response.data.length }));
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
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: t('admin.content.name'),
      accessorKey: 'trail_name',
    },
    {
      header: t('admin.content.type'),
      accessorKey: 'type_value',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t(`modal.${props.getValue()}`)}</span>;
        } else {
          return <span>{t('modal.no_translation_given')}</span>;
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
          return <span>{t('modal.no_translation_given')}</span>;
        }
      },
    },
    {
      header: t('admin.content.created_by'),
      accessorKey: 'username',
    },
    {
      header: t('admin.content.created'),
      accessorKey: 'found_date',
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.trail_manage_title')}</span>
        <span className='text-md'>{t('admin.content.all_trails_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_trails')}
            value={statistics.allPlaces}
            icon='places'
          />
          <AdminTileStat
            title={t('admin.content.previous_trails')}
            value={statistics.previousMonthPlaces}
            icon='mapPin'
          />
          <AdminTileStat
            title={t('admin.content.current_trails')}
            value={statistics.currentMonthPlaces}
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