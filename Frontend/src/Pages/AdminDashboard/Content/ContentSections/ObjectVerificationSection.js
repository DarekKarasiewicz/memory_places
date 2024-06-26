import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import AdminTileStat from '../Charts/AdminTileStat';
import ObjectVerificationTable from '../Tables/ObjectVerificationTable';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ObjectVerificationSection() {
  const { t } = useTranslation();
  const [verificationData, setVerificationData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const [cookies] = useCookies(['user']);
  const accessToken = cookies.user.accessToken;
  const { isVerificationsChanged } = modalData;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchVerificationItems = async () => {
    try {
      const verificationPlaces = await axios.get(
        `${appPath}/admin_dashboard/not_verified_places/`,
        {
          headers: {
            JWT: accessToken,
          },
        },
      );
      const verificationTrails = await axios.get(`${appPath}/admin_dashboard/not_verified_path/`, {
        headers: {
          JWT: accessToken,
        },
      });
      const allPlaces = await axios.get(`${appPath}/admin_dashboard/places/`, {
        headers: {
          JWT: accessToken,
        },
      });
      const allTrails = await axios.get(`${appPath}/admin_dashboard/path/`, {
        headers: {
          JWT: accessToken,
        },
      });

      const rawCombinedVerificationData = [...verificationPlaces.data, ...verificationTrails.data];
      const rawCombinedAllData = [...allPlaces.data, ...allTrails.data];

      const combinedAllData = rawCombinedVerificationData
        .sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
        .map((obj, index) => ({
          ...obj,
          lp: index + 1,
          place_name: Object.prototype.hasOwnProperty.call(obj, 'path_name')
            ? obj.path_name
            : obj.place_name,
          kind: Object.prototype.hasOwnProperty.call(obj, 'coordinates')
            ? t('admin.common.trails')
            : t('admin.common.places'),
          kind_value: Object.prototype.hasOwnProperty.call(obj, 'coordinates') ? 'T' : 'P',
        }));

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthPlaces = rawCombinedAllData.filter(
        (item) => getItemDate(item.verified_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPlaces = rawCombinedAllData.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate(),
      );

      setVerificationData(combinedAllData);
      setStatistics((statistics) => ({
        ...statistics,
        ['allPlaces']: combinedAllData.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['sumOfCurrentMonthPlaces']: sumOfCurrentMonthPlaces.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['sumOfPreviousMonthPlaces']: sumOfPreviousMonthPlaces.length,
      }));
      dispatch(adminDataActions.updateIsVerificationsChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (isVerificationsChanged || verificationData.length === 0) {
      fetchVerificationItems();
    }
  }, [isVerificationsChanged]);

  const verificationItemsColumns = [
    {
      header: t('admin.content.lp'),
      accessorKey: 'lp',
    },
    {
      header: t('admin.content.kind'),
      accessorKey: 'kind',
    },
    {
      header: t('admin.content.kind'),
      accessorKey: 'kind_value',
      show: false,
    },
    {
      header: 'ID',
      accessorKey: 'id',
      show: false,
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
          return <span>{t('modal.no_data')}</span>;
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
          return <span>{t('modal.no_data')}</span>;
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
          return <span>{t('modal.no_data')}</span>;
        }
      },
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
        <span className={`text-${fontSize}-3xl`}>{t('admin.common.verification_title')}</span>
        <span className={`text-${fontSize}-base`}>{t('admin.content.verification_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 max-xl:grid-cols-2 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_verification')}
            value={statistics.allPlaces}
            icon='clipboardCheck'
          />
          <AdminTileStat
            title={t('admin.content.previous_verified')}
            value={statistics.sumOfPreviousMonthPlaces}
            icon='flagCheck'
          />
          <AdminTileStat
            title={t('admin.content.current_verified')}
            value={statistics.sumOfCurrentMonthPlaces}
            icon='flagCheck'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <ObjectVerificationTable data={verificationData} columns={verificationItemsColumns} />
        </div>
      </div>
    </>
  );
}

export default ObjectVerificationSection;
