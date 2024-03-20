import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesTable from '../Tables/PlacesTable';

function PlaceManagamentSection() {
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
      alert('Error with data fetching!');
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
      header: 'Title',
      accessorKey: 'place_name',
    },
    {
      header: 'Sort of',
      accessorKey: 'sortof',
    },
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Period',
      accessorKey: 'period',
    },
    {
      header: 'Created by',
      accessorKey: 'username',
    },
    {
      header: 'Created',
      accessorKey: 'creation_date',
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>Zarządzanie miejscami pamięci</span>
        <span className='text-md'>Wszystkie informacje dotyczące utworzonych miejsc</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-slate-200'>
          <AdminTileStat title='All places' value={statistics.allPlaces} icon='places' />
          <AdminTileStat
            title='Previous month places'
            value={statistics.previousMonthPlaces}
            icon='map_pin'
          />
          <AdminTileStat
            title='Current month places'
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

export default PlaceManagamentSection;
