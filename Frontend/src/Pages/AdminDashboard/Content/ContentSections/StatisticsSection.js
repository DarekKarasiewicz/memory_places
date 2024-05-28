import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import AdminMultiDataBarChart from '../Charts/AdminMultiDataBarChart';
import AdminTileStat from '../Charts/AdminTileStat';

function StatisticsSection() {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isStatisticsChanged } = modalData;

  const fetchStatisticItems = async () => {
    try {
      const responseUsers = await axios.get(`http://127.0.0.1:8000/admin_dashboard/users`);
      const responsePlaces = await axios.get(`http://127.0.0.1:8000/admin_dashboard/places`);
      const responseTrails = await axios.get(`http://127.0.0.1:8000/admin_dashboard/path`);

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const monthlyItemsCount = [];

      const months = [
        t('admin.common.january'),
        t('admin.common.february'),
        t('admin.common.march'),
        t('admin.common.april'),
        t('admin.common.may'),
        t('admin.common.june'),
        t('admin.common.july'),
        t('admin.common.august'),
        t('admin.common.september'),
        t('admin.common.october'),
        t('admin.common.november'),
        t('admin.common.december'),
      ];
      const smonths = [
        t('admin.common.sjanuary'),
        t('admin.common.sfebruary'),
        t('admin.common.smarch'),
        t('admin.common.sapril'),
        t('admin.common.smay'),
        t('admin.common.sjune'),
        t('admin.common.sjuly'),
        t('admin.common.saugust'),
        t('admin.common.sseptember'),
        t('admin.common.soctober'),
        t('admin.common.snovember'),
        t('admin.common.sdecember'),
      ];

      months.forEach((monthName, index) => {
        const monthNumber = index.toString();

        monthlyItemsCount[monthNumber] = {
          name: monthName,
          sname: smonths[index],
          users: 0,
          places: 0,
          trails: 0,
        };
      });

      if (responseUsers.data !== 0) {
        responseUsers.data.forEach((item) => {
          const itemMonth = getItemDate(item.data_join);
          monthlyItemsCount[itemMonth].users += 1;
        });
      }

      if (responsePlaces.data !== 0) {
        responsePlaces.data.forEach((item) => {
          const itemMonth = getItemDate(item.creation_date);
          monthlyItemsCount[itemMonth].places += 1;
        });
      }

      if (responseTrails.data !== 0) {
        responseTrails.data.forEach((item) => {
          const itemMonth = getItemDate(item.creation_date);
          monthlyItemsCount[itemMonth].trails += 1;
        });
      }

      setStatistics((statistics) => ({ ...statistics, ['allUsers']: responseUsers.data.length }));
      setStatistics((statistics) => ({ ...statistics, ['allPlaces']: responsePlaces.data.length }));
      setStatistics((statistics) => ({ ...statistics, ['allTrails']: responseTrails.data.length }));
      setStatistics((statistics) => ({ ...statistics, ['objectsData']: monthlyItemsCount }));

      dispatch(adminDataActions.updateIsStatisticsChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (isStatisticsChanged || statistics.length === 0) {
      fetchStatisticItems();
    }
  }, [isStatisticsChanged]);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.statistics_title')}</span>
        <span className='text-md'>{t('admin.content.statistics_info')}</span>
      </div>
      <div className='grid grid-cols-3 grid-rows-4 gap-6'>
        <AdminTileStat
          title={t('admin.content.all_users_count')}
          value={statistics.allUsers}
          icon='userGroup'
        />
        <AdminTileStat
          title={t('admin.content.all_places_count')}
          value={statistics.allPlaces}
          icon='places'
        />
        <AdminTileStat
          title={t('admin.content.all_trails_count')}
          value={statistics.allTrails}
          icon='trail'
        />
        <div className='col-span-3 row-span-3 shadow rounded-lg h-auto p-4 pt-16 relative bg-mainBgColor'>
          <AdminMultiDataBarChart
            title={t('admin.content.all_object_graph')}
            data={statistics.objectsData}
          />
        </div>
      </div>
    </>
  );
}

export default StatisticsSection;
