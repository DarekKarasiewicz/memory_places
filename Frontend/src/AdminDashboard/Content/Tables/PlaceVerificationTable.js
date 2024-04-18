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
import SettingsIcon from '../../../icons/SettingsIcon';
import CancelIcon from '../../../icons/CancelIcon';
import EditIcon from '../../../icons/EditIcon';
import CheckIcon from '../../../icons/CheckIcon';

function PlaceVerificationTable({ data, columns }) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

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
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getFilteredRowModel().rows.length;
  const numPages = Math.ceil(rowCount / pageSize);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-semibold'>
          {t('admin.content.all_verification')} ({rowCount})
        </div>
        <div className='flex gap-4'>
          <div className='relative flex items-center shadow-sm'>
            <img
              src={`./assets/search_icon.svg`}
              alt={`search_icon`}
              className='h-5 w-5 absolute left-2'
            />
            <input
              className='rounded-lg p-2 pl-8 text-black'
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
              <td className='flex my-1 gap-4'>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'>
                  <CheckIcon className='h-5 w-5' />
                  <span>{t('admin.common.confirm')}</span>
                </span>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'>
                  <CancelIcon className='h-5 w-5' />
                  <span>{t('admin.common.dismiss')}</span>
                </span>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'>
                  <SettingsIcon className='h-5 w-5' />
                  <span>{t('admin.content.more_info')}</span>
                </span>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'>
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

export default PlaceVerificationTable;