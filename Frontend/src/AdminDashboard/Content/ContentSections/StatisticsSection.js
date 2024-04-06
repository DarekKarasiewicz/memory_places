import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AdminBarChart from '../Charts/AdminBarChart';
import AdminTileStat from '../Charts/AdminTileStat';

function StatisticsSection() {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState([]);

  const fetchItems = async () => {
    try {
      const responseUsers = await axios.get(`http://127.0.0.1:8000/admin_dashboard/users`);
      const responsePlaces = await axios.get(`http://127.0.0.1:8000/admin_dashboard/places`);

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

      const sumOfCurrentMonthPlaces = responsePlaces.data.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPlaces = responsePlaces.data.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      const sumOfPreviousMonthUsers = responsePlaces.data.filter(
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
      setStatistics((statistics) => ({ ...statistics, ['allPlaces']: responsePlaces.data.length }));
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
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
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
          icon='user_group'
        />
        <AdminTileStat
          title={t('admin.content.new_month_users')}
          value={statistics.currentMonthUsers}
          trend={statistics.usersTrend ? statistics.usersTrend : undefined}
          percentage={
            statistics.percentageUsersChange ? statistics.percentageUsersChange : undefined
          }
          icon='user_group'
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
            icon='user_group'
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
