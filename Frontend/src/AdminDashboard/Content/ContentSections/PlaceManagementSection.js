import AdminTileStat from '../Charts/AdminTileStat';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PlacesTable from '../Tables/PlacesTable';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

function PlaceManagementSection() {
  const { t } = useTranslation();
  const [places, setPlaces] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();

  const fetchPlaceItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/places`);

      const modifiedPlaceData = response.data.filter((item) => item.verified === true);

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthPlaces = modifiedPlaceData.filter(
        (item) => getItemDate(item.found_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPlaces = modifiedPlaceData.filter(
        (item) => getItemDate(item.found_date) === previousMonthDate,
      );

      setPlaces(modifiedPlaceData);
      setStatistics((statistics) => ({ ...statistics, ['allPlaces']: modifiedPlaceData.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['previousMonthPlaces']: sumOfPreviousMonthPlaces.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthPlaces']: sumOfCurrentMonthPlaces.length,
      }));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
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
            icon='mapPin'
          />
          <AdminTileStat
            title={t('admin.content.current_places')}
            value={statistics.currentMonthPlaces}
            icon='mapPin'
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
