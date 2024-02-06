import { forwardRef } from 'react';

const BaseSelect = forwardRef(function BaseSelect(props, ref) {
  return (
    <>
      <div className='w-full'>
        <label className='block pl-2 text-lg'>{props.label}</label>
        <select
          className={`block w-${props.width ? props.width : 'full'} rounded-l-lg rounded-r-lg px-1`}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          ref={ref}
          defaultValue={props.value}
          onBlur={props.onBlur}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});

export default BaseSelect;
