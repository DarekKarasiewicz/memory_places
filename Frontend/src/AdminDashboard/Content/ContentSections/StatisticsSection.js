import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AdminBarChart from '../Charts/AdminBarChart';
import AdminTileStat from '../Charts/AdminTileStat';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

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

      const modifiedPlaceData = responsePlaces.data.filter((item) => item.verified === true);
      console.log(responsePlaces.data.filter((item) => item.verified === true));

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthUsers = responseUsers.data.filter(
        (item) => getItemDate(item.data_join) === new Date().getMonth(),
      );

      const sumOfCurrentMonthPlaces = modifiedPlaceData.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPlaces = modifiedPlaceData.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      const sumOfPreviousMonthUsers = responseUsers.data.filter(
        (item) => getItemDate(item.data_join) === previousMonthDate,
      );

      if (sumOfPreviousMonthPlaces.length !== 0) {
        const percentagePlacesChange =
          ((sumOfCurrentMonthPlaces.length - sumOfPreviousMonthPlaces.length) /
            sumOfPreviousMonthPlaces.length) *
          100;

        const placesTrend = percentagePlacesChange > 0 ? 'up' : 'down';

        setStatistics((statistics) => ({
          ...statistics,
          ['percentagePlacesChange']: percentagePlacesChange,
        }));
        setStatistics((statistics) => ({ ...statistics, ['placesTrend']: placesTrend }));
      }

      if (sumOfPreviousMonthUsers.length !== 0) {
        const percentageUsersChange =
          ((sumOfCurrentMonthUsers.length - sumOfPreviousMonthUsers.length) /
            sumOfPreviousMonthUsers.length) *
          100;

        const usersTrend = percentageUsersChange > 0 ? 'up' : 'down';

        setStatistics((statistics) => ({
          ...statistics,
          ['percentageUsersChange']: percentageUsersChange,
        }));
        setStatistics((statistics) => ({ ...statistics, ['usersTrend']: usersTrend }));
      }

      const monthlyUsersCount = [];
      const monthlyPlacesCount = [];

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

        monthlyUsersCount[monthNumber] = {
          name: monthName,
          sname: smonths[index],
          users: 0,
        };

        monthlyPlacesCount[monthNumber] = {
          name: monthName,
          sname: smonths[index],
          places: 0,
        };
      });

      responseUsers.data.forEach((item) => {
        const itemMonth = getItemDate(item.data_join);
        monthlyUsersCount[itemMonth].users += 1;
      });

      responsePlaces.data.forEach((item) => {
        const itemMonth = getItemDate(item.creation_date);
        monthlyPlacesCount[itemMonth].places += 1;
      });

      setStatistics((statistics) => ({ ...statistics, ['allUsers']: responseUsers.data.length }));
      setStatistics((statistics) => ({ ...statistics, ['allPlaces']: modifiedPlaceData.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthUsers']: sumOfCurrentMonthUsers.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthPlaces']: sumOfCurrentMonthPlaces.length,
      }));
      setStatistics((statistics) => ({ ...statistics, ['monthlyUsersCount']: monthlyUsersCount }));
      setStatistics((statistics) => ({
        ...statistics,
        ['monthlyPlacesCount']: monthlyPlacesCount,
      }));

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
      <div className='grid grid-cols-4 grid-rows-4 gap-6'>
        <AdminTileStat
          title={t('admin.content.all_users_count')}
          value={statistics.allUsers}
          icon='userGroup'
        />
        <AdminTileStat
          title={t('admin.content.new_month_users')}
          value={statistics.currentMonthUsers}
          trend={statistics.usersTrend ? statistics.usersTrend : undefined}
          percentage={
            statistics.percentageUsersChange ? statistics.percentageUsersChange : undefined
          }
          icon='userGroup'
        />
        <AdminTileStat
          title={t('admin.content.all_places_count')}
          value={statistics.allPlaces}
          icon='places'
        />
        <AdminTileStat
          title={t('admin.content.new_month_places')}
          value={statistics.currentMonthPlaces}
          trend={statistics.placesTrend ? statistics.placesTrend : undefined}
          percentage={
            statistics.percentagePlacesChange ? statistics.percentagePlacesChange : undefined
          }
          icon='places'
        />
        <div className='col-span-2 row-span-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-mainBgColor'>
          <AdminBarChart
            title={t('admin.content.month_all_users')}
            icon='userGroup'
            data={statistics.monthlyUsersCount}
            dataName='users'
          />
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-mainBgColor'>
          <AdminBarChart
            title={t('admin.content.month_all_places')}
            icon='places'
            data={statistics.monthlyPlacesCount}
            dataName='places'
          />
        </div>
      </div>
    </>
  );
}

export default StatisticsSection;
