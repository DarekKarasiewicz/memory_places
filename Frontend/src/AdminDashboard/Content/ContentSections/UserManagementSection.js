import AdminTileStat from '../Charts/AdminTileStat';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicTable from '../Tables/BasicTable';
import usersData from '../Tables/exampleUsers.json';

function UserManagementSection() {
  // const [users, setusers] = useState([]);

  // const fetchUserItems = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/admin_dashboard/users`,
  //     );
  //     setusers(response.data);
  //   } catch (error) {
  //     alert('eldo');
  //   }
  // };

  // useEffect(() => {
  //   fetchUserItems();
  // }, []);

  const usersColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Created',
      accessorKey: 'created',
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
          <AdminTileStat title='General users' value='12536' percentage='56.65' icon='users' />
          <AdminTileStat title='Master users' value='123' percentage='56.65' icon='mod_user' />
          <AdminTileStat title='Admins' value='4' percentage='56.65' icon='admin_user' />
          <AdminTileStat
            title='New users this month'
            value='524'
            percentage='34.65'
            icon='new_users'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <BasicTable data={usersData} columns={usersColumns} />
        </div>
      </div>
    </>
  );
}

export default UserManagementSection;
