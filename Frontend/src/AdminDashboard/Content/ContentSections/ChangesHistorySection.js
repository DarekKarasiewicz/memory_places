import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryTable from '../Tables/HistoryTable';

function ChangesHistorySection() {
  const [changesData, setChangesData] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/changes`);
      setChangesData(response.data);
    } catch (error) {
      alert('Error with data fetching!');
    }
  };

  const changesColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Change date',
      accessorKey: 'change_date',
    },
    {
      header: 'Changed by',
      accessorKey: 'changed_by',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>Historia zmian na stronie</span>
        <span className='text-md'>Udokumentowane i opisane zmiany wprowadzone w aplikacji</span>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <HistoryTable data={changesData} columns={changesColumns} />
      </div>
    </>
  );
}

export default ChangesHistorySection;
