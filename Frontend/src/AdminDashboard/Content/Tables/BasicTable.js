import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

function BasicTable({ data, columns }) {
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
        <div className='text-xl font-semibold'>All users ({rowCount})</div>
        <div className='flex gap-4'>
          <div className='relative flex items-center shadow-sm'>
            <img
              src={`./assets/search_icon.svg`}
              alt={`search_icon`}
              className='h-5 w-5 absolute left-2'
            />
            <input
              className='rounded-lg p-2 pl-8'
              type='text'
              placeholder='Search...'
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
              className='font-semibold text-left text-normal bg-slate-200 border-2'
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
                    </div>
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} bg-white`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='flex my-1 gap-4'>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-cyan-200 transition cursor-pointer'>
                  <img
                    src={`./assets/settings_icon.svg`}
                    alt={`settings_icon`}
                    className='h-5 w-5'
                  />
                  <span>Zmień role</span>
                </span>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-cyan-200 transition cursor-pointer'>
                  <img src={`./assets/cancel_icon.svg`} alt={`cancel_icon`} className='h-5 w-5' />
                  <span>Usuń</span>
                </span>
                <span className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-cyan-200 transition cursor-pointer'>
                  <img src={`./assets/edit_icon.svg`} alt={`edit_icon`} className='h-5 w-5' />
                  <span>Edytuj</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end items-center gap-1 mr-6'>
        <div className='mr-4'>
          Page {pageIndex + 1} of {numPages === 0 ? 1 : numPages}
        </div>
        <button
          className={`p-2 bg-white shadow rounded-lg ${
            !table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className={`p-2 bg-white shadow rounded-lg ${
            !table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className={`p-2 bg-white shadow rounded-lg ${
            !table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className={`p-2 bg-white shadow rounded-lg ${
            !table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <select
          className='p-2 bg-white shadow rounded-lg'
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

export default BasicTable;
