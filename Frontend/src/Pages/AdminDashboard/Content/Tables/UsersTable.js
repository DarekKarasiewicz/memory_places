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
import { useDispatch } from 'react-redux';
import { adminActions } from 'Redux/adminActionSlice';
import { useCookies } from 'react-cookie';

import SettingsIcon from 'icons/SettingsIcon';
import BlockIcon from 'icons/BlockIcon';
import PassIcon from 'icons/PassIcon';
import UnlockIcon from 'icons/UnlockIcon';
import SearchIcon from 'icons/SearchIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function UsersTable({ data, columns }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
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

  const handleUserBlock = (id, name) => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
    dispatch(adminActions.changeAction('user_block'));
    dispatch(adminActions.changeUserId(id));
    dispatch(adminActions.changeUserName(name));
  };

  const handleUserUnlock = (id, name) => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
    dispatch(adminActions.changeAction('user_unlock'));
    dispatch(adminActions.changeUserId(id));
    dispatch(adminActions.changeUserName(name));
  };

  const handlePasswordReset = (id, name) => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
    dispatch(adminActions.changeAction('user_pass_reset'));
    dispatch(adminActions.changeUserId(id));
    dispatch(adminActions.changeUserName(name));
  };

  const handleUserRole = (id, name) => {
    dispatch(adminActions.changeIsAdminActionsModalOpen());
    dispatch(adminActions.changeAction('user_role'));
    dispatch(adminActions.changeUserId(id));
    dispatch(adminActions.changeUserName(name));
  };
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className={`text-${fontSize}-xl font-semibold`}>
          {t('admin.content.all_users')} ({rowCount})
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
                row.original.id === cookies.user.user_id
                  ? 'bg-contrastColor'
                  : index % 2 === 0
                    ? 'bg-mainBgColor'
                    : 'bg-thirdBgColor'
              } text-${fontSize}-base`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='flex gap-2 py-2'>
                {row.original.id !== cookies.user.user_id ? (
                  <>
                    {user.admin && (
                      <span
                        className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                        onClick={() => handleUserRole(row.original.id, row.original.username)}
                      >
                        <SettingsIcon className='h-5 w-5' />
                        <span className='w-fit'>{t('admin.content.change_role')}</span>
                      </span>
                    )}

                    <span
                      className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                      onClick={() => handlePasswordReset(row.original.id, row.original.username)}
                    >
                      <PassIcon className='h-5 w-5' />
                      <span className='w-fit'>{t('admin.content.pass_reset')}</span>
                    </span>

                    {row.original.active ? (
                      <span
                        className='flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                        onClick={() => handleUserBlock(row.original.id, row.original.username)}
                      >
                        <BlockIcon className='h-5 w-5' />
                        <span className='w-fit'>{t('admin.content.block')}</span>
                      </span>
                    ) : (
                      <span
                        className='flex gap-1 px-2 py-1 rounded-lg hover:bg-contrastColor transition cursor-pointer'
                        onClick={() => handleUserUnlock(row.original.id, row.original.username)}
                      >
                        <UnlockIcon className='h-5 w-5' />
                        <span className='w-fit'>{t('admin.content.unlock')}</span>
                      </span>
                    )}
                  </>
                ) : (
                  <span className='max-2xl:py-4'>{t('admin.content.cannot_change_info')}</span>
                )}
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

export default UsersTable;
