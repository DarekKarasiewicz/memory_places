import { forwardRef } from 'react';

const BaseTextarea = forwardRef(function BaseTextarea(props, ref) {
  return (
    <>
      <div className='flex justify-between items-center'>
        <label className='block pl-1 pb-1 text-base'>{props.label}</label>
        <label className='block pr-1 text-sm'>{props.secondLabel}</label>
      </div>
      <textarea
        className={`block w-${
          props.width ? props.width : 'full'
        } rounded-l-lg rounded-r-lg p-2 text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] focus:outline-contrastColor ${
          props.isValid === false ? 'bg-red-400' : ''
        }`}
        placeholder={props.placeholder ? props.placeholder : ''}
        name={props.name}
        rows={props.rows}
        maxLength={props.maxLength}
        ref={ref}
        defaultValue={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        readOnly={props.readOnly}
      />
    </>
  );
});

export default BaseTextarea;
