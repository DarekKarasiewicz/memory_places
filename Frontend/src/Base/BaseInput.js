import { forwardRef } from 'react';
import moment from 'moment';

const BaseInput = forwardRef(function BaseInput(props, ref) {
  return (
    <>
      <div className='w-full'>
        <label className='block pl-1 pb-1 text-base'>{props.label}</label>
        <input
          className={`block w-${
            props.width ? props.width : 'full'
          } rounded-l-lg rounded-r-lg p-2 pl-3 ${props.className ? props.className : ''} ${
            props.isValid === false ? 'bg-red-500' : ''
          }`}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          defaultValue={props.value}
          ref={ref}
          onBlur={props.onBlur}
          onChange={props.onChange}
          max={props.blockFuture ? moment().format('YYYY-MM-DD') : null}
        ></input>
      </div>
    </>
  );
});

export default BaseInput;
