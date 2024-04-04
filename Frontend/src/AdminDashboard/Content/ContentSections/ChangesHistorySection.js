import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import HistoryTable from '../Tables/HistoryTable';

function ChangesHistorySection() {
  const { t } = useTranslation();
  const [changesData, setChangesData] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/admin_dashboard/changes`);
      setChangesData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const changesColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: t('admin.content.name'),
      accessorKey: 'name',
    },
    {
      header: t('admin.content.changed_date'),
      accessorKey: 'change_date',
    },
    {
      header: t('admin.content.changed_by'),
      accessorKey: 'changed_by',
    },
    {
      header: t('admin.content.role'),
      accessorKey: 'role',
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.history_title')}</span>
        <span className='text-md'>{t('admin.content.history_info')}</span>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <HistoryTable data={changesData} columns={changesColumns} />
      </div>
    </>
  );
}

export default ChangesHistorySection;
