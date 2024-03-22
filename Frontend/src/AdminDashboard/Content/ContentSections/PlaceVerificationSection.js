import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaceVerificationTable from '../Tables/PlaceVerificationTable';

function PlaceVerificationSection() {
  const [places, setPlaces] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/changes`);

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
        ['sumOfCurrentMonthPlaces']: sumOfCurrentMonthPlaces.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['sumOfPreviousMonthPlaces']: sumOfPreviousMonthPlaces.length,
      }));
    } catch (error) {
      alert('Error with data fetching!');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const placeVerificationColumns = [
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
        <span className='text-3xl'>Weryfikacja miejsc pamięci</span>
        <span className='text-md'>
          Sprawdzanie poprawności informacji zawartych w utworzonych przez użytkowników miejsc
        </span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-slate-200'>
          <AdminTileStat
            title='All places awaiting verification'
            value={statistics.allPlaces}
            icon='clipboard_check'
          />
          <AdminTileStat
            title='Verificated in previous month'
            value={statistics.sumOfCurrentMonthPlaces}
            icon='flag_check'
          />
          <AdminTileStat
            title='Verificated in current month'
            value={statistics.sumOfPreviousMonthPlaces}
            icon='flag_check'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <PlaceVerificationTable data={places} columns={placeVerificationColumns} />
        </div>
      </div>
    </>
  );
}

export default PlaceVerificationSection;
