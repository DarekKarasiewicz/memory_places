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
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { adminDataActions } from 'Redux/adminDataSlice';

import SearchIcon from 'icons/SearchIcon';
import RefreshIcon from 'icons/RefreshIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function HistoryTable({ data, columns }) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const dispatch = useDispatch();
  const [columnVisibility, setColumnVisibility] = useState({ id: false });
  const { fontSize } = useFontSize();

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

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className={`text-${fontSize}-xl font-semibold`}>
          {t('admin.content.all_history')} ({rowCount})
        </div>
        <div className='flex justify-center items-center gap-4'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='cursor-pointer relative'
            onClick={() => dispatch(adminDataActions.updateIsHistoryChanged(true))}
          >
            <RefreshIcon className='h-8 w-8' />
          </motion.div>
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

export default HistoryTable;
