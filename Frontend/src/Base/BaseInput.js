import { forwardRef } from 'react';

const BaseInput = forwardRef(function BaseInput(props, ref) {
  return (
    <>
      <div className='w-full'>
        <label className='block pl-2 text-lg'>{props.label}</label>
        <input
          className={`block w-${props.width ? props.width : 'full'} rounded-l-lg rounded-r-lg px-2`}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          ref={ref}
        />
      </div>
    </>
  );
});

export default BaseInput;
