import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from '../Tables/UsersTable';
//import users from '../Tables/exampleUsers.json';

function UserManagementSection() {
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/users`);

      const modifyUserData = response.data.map((item) => {
        const role = item.admin ? 'Admin' : item.master ? 'Master user' : 'User';

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
      alert('Error with data fetching!');
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
      header: 'Name',
      accessorKey: 'username',
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (props) => {
        if (props.role === 'Admin') {
          return <span className='px-2 bg-red-300'>{props.getValue()}</span>;
        } else if (props.role === 'Master user') {
          return <span className='px-2 bg-green-300'>{props.getValue()}</span>;
        } else {
          return <span className='px-2 bg-yellow-300'>{props.getValue()}</span>;
        }
      },
    },
    {
      header: 'Active',
      accessorKey: 'active',
      cell: (props) => {
        if (props.getValue()) {
          return <span>YES</span>;
        } else {
          return <span>NO</span>;
        }
      },
    },
    {
      header: 'Third-Party User',
      accessorKey: 'outside',
      cell: (props) => {
        if (props.getValue()) {
          return <span>YES</span>;
        } else {
          return <span>NO</span>;
        }
      },
    },
    {
      header: 'Created',
      accessorKey: 'data_join',
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>Zarządzanie użytkownikami</span>
        <span className='text-md'>Wszystkie informacje dotyczące użytkowników</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-4 gap-6 w-full p-6 bg-slate-200'>
          <AdminTileStat title='General users' value={statistics.allUsers} icon='users' />
          <AdminTileStat title='Master users' value={statistics.sumOfMasters} icon='mod_user' />
          <AdminTileStat title='Admins' value={statistics.sumOfAdmins} icon='admin_user' />
          <AdminTileStat
            title='New users this month'
            value={statistics.sumOfMonthUsers}
            icon='new_users'
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
