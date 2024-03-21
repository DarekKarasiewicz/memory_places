import React from 'react';

function AdminTileStat(props) {
  return (
    <>
      <div className='flex flex-col justify-between shadow rounded-lg h-36 px-6 py-6 bg-white'>
        <span className='flex justify-start items-center gap-2 text-2xl leading-6'>
          {props.icon && (
            <img
              src={`./assets/admin/${props.icon}_icon.svg`}
              alt={`${props.icon}_icon`}
              className='h-7 w-7'
            ></img>
          )}

          <span>{props.title}</span>
        </span>
        <div className='flex justify-between mx-4'>
          <span className='text-3xl font-semibold'>{props.value}</span>
          {props.percentage && (
            <span
              className={`flex items-center justify-center gap-1 rounded-full font-semibold px-2 ${
                props.trend === 'up' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'
              }`}
            >
              {props.trend && (
                <img
                  src={`./assets/admin/trending_${props.trend}_icon.svg`}
                  alt={`trending_${props.trend}_icon`}
                  className='h-4 w-4'
                ></img>
              )}
              <span>{props.percentage}%</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminTileStat;
