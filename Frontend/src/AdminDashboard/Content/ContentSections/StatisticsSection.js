import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminBarChart from '../Charts/AdminBarChart';
import AdminTileStat from '../Charts/AdminTileStat';

function StatisticsSection() {
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
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const smonths = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
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
      alert('Error with data fetching!');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>Statystki strony</span>
        <span className='text-md'>Zebrane statystki strony w jednym miejscu!</span>
      </div>
      <div className='grid grid-cols-4 grid-rows-4 gap-6'>
        <AdminTileStat title='Total users' value={statistics.allUsers} icon='user_group' />
        <AdminTileStat
          title='Current month users'
          value={statistics.currentMonthUsers}
          trend={statistics.usersTrend ? statistics.usersTrend : undefined}
          percentage={
            statistics.percentageUsersChange ? statistics.percentageUsersChange : undefined
          }
          icon='user_group'
        />
        <AdminTileStat title='Total memory places' value={statistics.allPlaces} icon='places' />
        <AdminTileStat
          title='Current month memory places'
          value={statistics.currentMonthPlaces}
          trend={statistics.placesTrend ? statistics.placesTrend : undefined}
          percentage={
            statistics.percentagePlacesChange ? statistics.percentagePlacesChange : undefined
          }
          icon='places'
        />
        <div className='col-span-2 row-span-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-white'>
          <AdminBarChart
            title='New users per month'
            icon='user_group'
            data={statistics.monthlyUsersCount}
            dataName='users'
          />
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-white'>
          <AdminBarChart
            title='New places per month'
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