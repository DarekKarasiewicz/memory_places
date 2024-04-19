import { forwardRef } from 'react';

const BaseSelect = forwardRef(function BaseSelect(props, ref) {
  return (
    <>
      <div className='w-full'>
        {!props.disabledLabel && <label className='block pl-1 pb-1 text-base'>{props.label}</label>}
        <select
          className={`block w-${
            props.width ? props.width : 'full'
          } rounded-l-lg rounded-r-lg p-2 text-black ${
            props.isValid === false ? 'bg-red-500' : ''
          }`}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          ref={ref}
          defaultValue={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          disabled={props.readOnly}
        >
          {props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});

export default BaseSelect;
