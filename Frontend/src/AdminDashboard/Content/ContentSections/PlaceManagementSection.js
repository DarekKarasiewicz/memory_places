import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PlacesTable from '../Tables/PlacesTable';

function PlaceManagementSection() {
  const { t } = useTranslation();
  const [places, setPlaces] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const fetchPlaceItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/places`);
      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthPlaces = response.data.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPlaces = response.data.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      setPlaces(response.data);
      setStatistics((statistics) => ({ ...statistics, ['allPlaces']: response.data.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['previousMonthPlaces']: sumOfPreviousMonthPlaces.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthPlaces']: sumOfCurrentMonthPlaces.length,
      }));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchPlaceItems();
  }, []);

  const placesColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: t('admin.content.name'),
      accessorKey: 'place_name',
    },
    {
      header: t('admin.content.sortof'),
      accessorKey: 'sortof',
    },
    {
      header: t('admin.content.type'),
      accessorKey: 'type',
    },
    {
      header: t('admin.content.period'),
      accessorKey: 'period',
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
        <span className='text-3xl'>{t('admin.common.place_manage_title')}</span>
        <span className='text-md'>{t('admin.content.all_places_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_places')}
            value={statistics.allPlaces}
            icon='places'
          />
          <AdminTileStat
            title={t('admin.content.previous_places')}
            value={statistics.previousMonthPlaces}
            icon='map_pin'
          />
          <AdminTileStat
            title={t('admin.content.current_places')}
            value={statistics.currentMonthPlaces}
            icon='map_pin'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <PlacesTable data={places} columns={placesColumns} />
        </div>
      </div>
    </>
  );
}

export default PlaceManagementSection;
