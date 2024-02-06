import { forwardRef } from 'react';

const BaseTextarea = forwardRef(function BaseTextarea(props, ref) {
  return (
    <>
      <label className='block pl-2 text-lg'>{props.label}</label>
      <textarea
        className={`block w-${props.width ? props.width : 'full'} rounded-l-lg rounded-r-lg px-2`}
        placeholder={props.placeholder ? props.placeholder : ''}
        name={props.name}
        rows={props.rows}
        ref={ref}
        defaultValue={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
});

export default BaseTextarea;
