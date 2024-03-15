import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'January',
    sname: 'Jan.',
    users: 4000,
  },
  {
    name: 'February',
    sname: 'Feb.',
    users: 3000,
  },
  {
    name: 'March',
    sname: 'Mar.',
    users: 2000,
  },
  {
    name: 'April',
    sname: 'Apr.',
    users: 2780,
  },
  {
    name: 'May',
    sname: 'May',
    users: 1890,
  },
  {
    name: 'June',
    sname: 'Jun.',
    users: 2390,
  },
  {
    name: 'July',
    sname: 'Jul.',
    users: 6700,
  },
  {
    name: 'August',
    sname: 'Aug.',
    users: 3780,
  },
  {
    name: 'September',
    sname: 'Sep.',
    users: 3490,
  },
  {
    name: 'October',
    sname: 'Oct.',
    users: 3490,
  },
  {
    name: 'November',
    sname: 'Nov.',
    users: 9000,
  },
  {
    name: 'December',
    sname: 'Dec.',
    users: 500,
  },
];

function AdminBarChart(props) {
  return (
    <>
      <div className='flex justify-start items-center gap-2 absolute top-4 left-6'>
        <img
          src={`./assets/admin/${props.icon}_icon.svg`}
          alt={`${props.icon}_icon`}
          className='h-7 w-7'
        ></img>
        <span className='text-2xl'>{props.title}</span>
      </div>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={1000}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='sname' tick={{ dy: 5 }} padding={{ left: 5, right: 5 }} interval={0} />
          <YAxis domain={['auto', (dataMax) => dataMax * 1.25]} />
          <Tooltip
            labelFormatter={(value) => data.find((item) => item.sname === value).name}
            formatter={(value, name) => [value, name]}
          />
          <Legend wrapperStyle={{ position: 'relative', marginTop: '-15px' }} />
          <Bar
            dataKey='users'
            fill='#82ca9d'
            activeBar={<Rectangle fill='gold' stroke='purple' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default AdminBarChart;
