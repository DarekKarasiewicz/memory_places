import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from '../Tables/UsersTable';
import { useTranslation } from 'react-i18next';
//import users from '../Tables/exampleUsers.json';

function UserManagementSection() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState([]);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/users`);

      const modifyUserData = response.data.map((item) => {
        const role = item.admin
          ? t('admin.content.admin')
          : item.master
            ? t('admin.content.master_user')
            : t('admin.content.users');

        return {
          ...item,
          role,
        };
      });

      const sumOfAdminValues = modifyUserData.filter((item) => item.admin);
      const sumOfMasterValues = modifyUserData.filter((item) => item.master);

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const sumOfCurrentMonthUsers = modifyUserData.filter(
        (item) => getItemDate(item.data_join) === new Date().getMonth(),
      );

      modifyUserData.forEach((element) => getItemDate(element.data_join));

      setUsers(modifyUserData);
      setStatistics((statistics) => ({ ...statistics, ['allUsers']: modifyUserData.length }));
      setStatistics((statistics) => ({ ...statistics, ['sumOfAdmins']: sumOfAdminValues.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['sumOfMasters']: sumOfMasterValues.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['sumOfMonthUsers']: sumOfCurrentMonthUsers.length,
      }));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  const usersColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: t('admin.content.name'),
      accessorKey: 'username',
    },
    {
      header: t('admin.content.role'),
      accessorKey: 'role',
      cell: (props) => {
        if (props.role === 'Admin') {
          return <span className='px-2 py-1 bg-red-300 text-black'>{props.getValue()}</span>;
        } else if (props.role === 'Master user') {
          return <span className='px-2 py-1 bg-green-300 text-black'>{props.getValue()}</span>;
        } else {
          return <span className='px-2 py-1 bg-yellow-300 text-black'>{props.getValue()}</span>;
        }
      },
    },
    {
      header: t('admin.content.active'),
      accessorKey: 'active',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t('admin.common.yes')}</span>;
        } else {
          return <span>{t('admin.common.no')}</span>;
        }
      },
    },
    {
      header: t('admin.content.third_party_users'),
      accessorKey: 'outside',
      cell: (props) => {
        if (props.getValue()) {
          return <span>{t('admin.common.yes')}</span>;
        } else {
          return <span>{t('admin.common.no')}</span>;
        }
      },
    },
    {
      header: t('admin.content.created'),
      accessorKey: 'data_join',
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.user_manage_title')}</span>
        <span className='text-md'>{t('admin.content.all_users_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-4 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.users')}
            value={statistics.allUsers}
            icon='users'
          />
          <AdminTileStat
            title={t('admin.content.master_user')}
            value={statistics.sumOfMasters}
            icon='modUser'
          />
          <AdminTileStat
            title={t('admin.content.admin')}
            value={statistics.sumOfAdmins}
            icon='adminUser'
          />
          <AdminTileStat
            title={t('admin.content.new_month_users')}
            value={statistics.sumOfMonthUsers}
            icon='newUsers'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <UsersTable data={users} columns={usersColumns} />
        </div>
      </div>
    </>
  );
}

export default UserManagementSection;
