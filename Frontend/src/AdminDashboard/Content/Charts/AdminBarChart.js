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
import UserGroupIcon from '../../../icons/admin/UserGroupIcon';
import PlacesIcon from '../../../icons/admin/PlacesIcon';

function AdminBarChart(props) {
  const iconComponents = {
    userGroup: <UserGroupIcon />,
    places: <PlacesIcon />,
  };

  const IconComponent = iconComponents[props.icon] || null;

  return (
    <>
      <div className='flex justify-start items-center gap-2 absolute top-6 left-6'>
        {IconComponent ? IconComponent : null}
        <span className='text-2xl'>{props.title}</span>
      </div>
      <ResponsiveContainer width='100%' height='100%' className={'text-black'}>
        <BarChart
          width={500}
          height={1000}
          data={props.data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='sname' tick={{ dy: 5 }} padding={{ left: 5, right: 5 }} interval={0} />
          <YAxis domain={['auto', (dataMax) => dataMax * 2]} />
          <Tooltip
            labelFormatter={(value) => props.data.find((item) => item.sname === value).name}
            formatter={(value, name) => [value, name]}
          />
          <Legend wrapperStyle={{ position: 'relative', marginTop: '-15px' }} />
          <Bar
            dataKey={props.dataName}
            fill='#0891b2'
            activeBar={<Rectangle fill='gold' stroke='purple' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default AdminBarChart;
