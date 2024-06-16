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
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { adminDataActions } from 'Redux/adminDataSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';

import SettingsIcon from 'icons/SettingsIcon';
import CancelIcon from 'icons/CancelIcon';
import EditIcon from 'icons/EditIcon';
import CheckIcon from 'icons/CheckIcon';
import SearchIcon from 'icons/SearchIcon';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function ObjectVerificationTable({ data, columns }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [cookies] = useCookies(['user']);
  const accessToken = cookies.accessToken;
  const [columnVisibility, setColumnVisibility] = useState({ id: false, kind_value: false });
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

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

  const handlePlaceConfirmation = (placeId, kind_value) => {
    const checkKind = kind_value === 'P' ? 'places' : 'path';
    let currentDate = new Date();

    axios
      .put(
        `${appPath}/admin_dashboard/${checkKind}/${placeId}/`,
        {
          verified: true,
          verified_date: currentDate.toISOString().slice(0, 10),
        },
        {
          headers: {
            JWT: accessToken,
          },
        },
      )
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

  const handlePlaceDismiss = (placeId, kind_value) => {
    const checkKind = kind_value === 'P' ? 'places' : 'path';

    axios
      .delete(`${appPath}/admin_dashboard/${checkKind}/${placeId}/`, {
        headers: {
          JWT: accessToken,
        },
      })
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
        <div className={`text-${fontSize}-xl font-semibold`}>
          {t('admin.content.all_verification')} ({rowCount})
        </div>
        <div className='flex gap-4'>
          <div className='relative flex items-center shadow-sm'>
            <SearchIcon className='h-5 w-5 absolute left-2' color='#000000' />
            <input
              className={`rounded-lg p-2 pl-8 text-black focus:outline-contrastColor text-${fontSize}-base`}
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
              className={`font-semibold text-left bg-thirdBgColor text-${fontSize}-base`}
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
              className={`${
                index % 2 === 0 ? 'bg-mainBgColor' : 'bg-thirdBgColor'
              } text-${fontSize}-base`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='flex my-2 mx-2 gap-2 max-2xl:py-4 max-xl:py-6'>
                <span
                  className='flex justify-center items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() => handlePlaceConfirmation(row.original.id, row.original.kind_value)}
                >
                  <CheckIcon className='h-5 w-5' />
                  <span>{t('admin.common.confirm')}</span>
                </span>
                <span
                  className='flex justify-center items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() => handlePlaceDismiss(row.original.id, row.original.kind_value)}
                >
                  <CancelIcon className='h-5 w-5' />
                  <span>{t('admin.common.dismiss')}</span>
                </span>
                <span
                  className='flex justify-center items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() =>
                    navigate(
                      `/adminDashboard/${
                        row.original.kind_value === 'P' ? 'place' : 'trail'
                      }View/` + row.original.id,
                    )
                  }
                >
                  <SettingsIcon className='h-5 w-5' />
                  <span className='w-min'>{t('admin.content.more_info')}</span>
                </span>
                <span
                  className='flex justify-center items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                  onClick={() =>
                    navigate(
                      `/adminDashboard/${
                        row.original.kind_value === 'P' ? 'place' : 'trail'
                      }Edit/` + row.original.id,
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
      <div className={`flex justify-end items-center gap-1 mr-6 text-${fontSize}-base`}>
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
