import AdminBarChart from '../Charts/AdminBarChart';
import AdminTileStat from '../Charts/AdminTileStat';

function StatisticsSection() {
  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>Statystki strony</span>
        <span className='text-md'>Zebrane statystki strony w jednym miejscu!</span>
      </div>
      <div className='grid grid-cols-4 grid-rows-4 gap-6'>
        <AdminTileStat
          title='Total users'
          value='3564'
          percentage='56.65'
          trend='up'
          icon='user_group'
        />
        <AdminTileStat
          title='Current month users'
          value='546'
          percentage='15.25'
          trend='down'
          icon='user_group'
        />
        <AdminTileStat
          title='Total memory places'
          value='240'
          percentage='32.01'
          trend='up'
          icon='places'
        />
        <AdminTileStat
          title='Current month memory places'
          value='3125'
          percentage='67.67'
          trend='down'
          icon='places'
        />
        <div className='col-span-2 row-span-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-white'>
          <AdminBarChart title='New users per month' icon='user_group' />
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-2 shadow rounded-lg h-auto p-4 pt-16 relative bg-white'>
          <AdminBarChart title='New places per month' icon='places' />
        </div>
      </div>
    </>
  );
}

export default StatisticsSection;
