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

import UserGroupIcon from 'icons/admin/UserGroupIcon';
import PlacesIcon from 'icons/admin/PlacesIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function AdminBarChart(props) {
  const { fontSize } = useFontSize();

  const iconComponents = {
    userGroup: <UserGroupIcon />,
    places: <PlacesIcon />,
  };

  const IconComponent = iconComponents[props.icon] || null;

  return (
    <>
      <div className='flex justify-start items-center gap-2 absolute top-6 left-6'>
        {IconComponent ? IconComponent : null}
        <span className={`text-${fontSize}-2xl`}>{props.title}</span>
      </div>
      <ResponsiveContainer width='100%' height='100%' className={`text-black`}>
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
          <XAxis
            dataKey='sname'
            tick={{ dy: 5, fontSize: fontSize === 'base' ? 16 : 20 }}
            padding={{ left: 5, right: 5 }}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: fontSize === 'base' ? 16 : 20 }}
            domain={['auto', (dataMax) => dataMax * 2]}
          />
          <Tooltip
            labelFormatter={(value) => props.data.find((item) => item.sname === value).name}
            formatter={(value, name) => [value, name]}
            contentStyle={{ fontSize: fontSize === 'base' ? 16 : 20 }}
          />
          <Legend
            wrapperStyle={{
              position: 'relative',
              marginTop: fontSize === 'base' ? '-15px' : '-20px',
              fontSize: fontSize === 'base' ? 16 : 20,
            }}
          />
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
