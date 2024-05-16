import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import axios from 'axios';
import SettingsIcon from 'icons/SettingsIcon';
import CancelIcon from 'icons/CancelIcon';
import EditIcon from 'icons/EditIcon';
import CheckIcon from 'icons/CheckIcon';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from 'utils';
import SearchIcon from 'icons/SearchIcon';
import { adminDataActions } from 'Redux/adminDataSlice';

function ObjectVerificationTable({ data, columns }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [cookies] = useCookies(['user']);
  const [columnVisibility, setColumnVisibility] = useState({ id: false });

  const table = useReactTable({
    data,
    columns,
    initialState: { pageIndex: 0, pageSize: 10 },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getFilteredRowModel().rows.length;
  const numPages = Math.ceil(rowCount / pageSize);

  const handlePlaceConfirmation = (placeId, kind) => {
    const checkKind = kind === 'P' ? 'places' : 'path';
    let currentDate = new Date();

    axios
      .put(`http://127.0.0.1:8000/admin_dashboard/${checkKind}/${placeId}/`, {
        verified: true,
        verified_date: currentDate.toISOString().slice(0, 10),
      })
      .then(() => {
        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('success'));
        dispatch(adminDataActions.updateIsVerificationsChanged(true));
        registerAppChanges('admin.changes_messages.place_verified', cookies.user, placeId);
      })
      .catch(() => {
        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('error'));
      });
  };

  const handlePlaceDismiss = (placeId, kind) => {
    const checkKind = kind === 'P' ? 'places' : 'path';

    axios
      .delete(`http://127.0.0.1:8000/admin_dashboard/${checkKind}/${placeId}/`)
      .then(() => {
        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('success'));
        dispatch(adminDataActions.updateIsVerificationsChanged(true));
        registerAppChanges('admin.changes_messages.place_unverified', cookies.user, placeId);
      })
      .catch(() => {
        dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
        dispatch(confirmationModalActions.changeType('error'));
      });
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-semibold'>
          {t('admin.content.all_verification')} ({rowCount})
        </div>
        <div className='flex gap-4'>
          <div className='relative flex items-center shadow-sm'>
            <SearchIcon className='h-5 w-5 absolute left-2' color='#000000' />
            <input
              className='rounded-lg p-2 pl-8 text-black focus:outline-contrastColor'
              type='text'
              placeholder={t('admin.content.search')}
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <table className='w-full shadow-sm'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='font-semibold text-left text-normal bg-thirdBgColor'
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className='p-2'
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
                    </div>
                  )}
                </th>
              ))}
              <th className='p-2'>{t('admin.content.actions')}</th>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${index % 2 === 0 ? 'bg-mainBgColor' : 'bg-thirdBgColor'}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='flex my-2 mx-2 gap-2'>
                <span
                  className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() => handlePlaceConfirmation(row.original.id, row.original.kind)}
                >
                  <CheckIcon className='h-5 w-5' />
                  <span>{t('admin.common.confirm')}</span>
                </span>
                <span
                  className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() => handlePlaceDismiss(row.original.id, row.original.kind)}
                >
                  <CancelIcon className='h-5 w-5' />
                  <span>{t('admin.common.dismiss')}</span>
                </span>
                <span
                  className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() =>
                    navigate(
                      `/adminDashboard/${row.original.kind === 'P' ? 'place' : 'trail'}View/` +
                        row.original.id,
                    )
                  }
                >
                  <SettingsIcon className='h-5 w-5' />
                  <span className='w-min'>{t('admin.content.more_info')}</span>
                </span>
                <span
                  className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() =>
                    navigate(
                      `/adminDashboard/${row.original.kind === 'P' ? 'place' : 'trail'}Edit/` +
                        row.original.id,
                    )
                  }
                >
                  <EditIcon className='h-5 w-5' />
                  <span>{t('admin.content.edit')}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end items-center gap-1 mr-6'>
        <div className='mr-4'>
          {t('admin.content.table_items_info', {
            from: pageIndex + 1,
            to: numPages === 0 ? 1 : numPages,
          })}
        </div>
        <button
          className={`p-2 bg-thirdBgColor shadow rounded-lg ${
            !table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className={`p-2 bg-thirdBgColor shadow rounded-lg ${
            !table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className={`p-2 bg-thirdBgColor shadow rounded-lg ${
            !table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className={`p-2 bg-thirdBgColor shadow rounded-lg ${
            !table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <select
          className='p-2 bg-thirdBgColor shadow rounded-lg'
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ObjectVerificationTable;