import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PlaceVerificationTable from '../Tables/PlaceVerificationTable';

function PlaceVerificationSection() {
  const { t } = useTranslation();
  const [places, setPlaces] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/not_verified_places`);

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
      alert(error);
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
      header: t('admin.content.name'),
      accessorKey: 'place_name',
    },
    {
      header: t('admin.content.sortof'),
      accessorKey: 'sortof_value',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t(`modal.${props.getValue()}`)}</span>;
        } else {
          return <span>{t('modal.no_translation_given')}</span>;
        }
      },
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
        <span className='text-3xl'>{t('admin.common.verification_title')}</span>
        <span className='text-md'>{t('admin.content.verification_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_verification')}
            value={statistics.allPlaces}
            icon='clipboardCheck'
          />
          <AdminTileStat
            title={t('admin.content.previous_verified')}
            value={statistics.sumOfCurrentMonthPlaces}
            icon='flagCheck'
          />
          <AdminTileStat
            title={t('admin.content.current_verified')}
            value={statistics.sumOfPreviousMonthPlaces}
            icon='flagCheck'
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
