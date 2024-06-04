import { forwardRef } from 'react';
import moment from 'moment';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const BaseInput = forwardRef(function BaseInput(props, ref) {
  const { fontSize } = useFontSize();

  return (
    <>
      <div className='w-full'>
        {(props.label || props.secondLabel) && (
          <div className='flex justify-between items-center'>
            <label className={`block pl-1 pb-1 text-${fontSize}-base`}>{props.label}</label>
            <label className={`block pr-1 text-${fontSize}-sm`}>{props.secondLabel}</label>
          </div>
        )}
        <input
          className={`block w-${
            props.width ? props.width : 'full'
          } rounded-l-lg rounded-r-lg p-2 pl-3 text-black drop-shadow-sm shadow-itemShadow focus:outline-contrastColor text-${fontSize}-base ${
            props.className ? props.className : ''
          } ${props.isValid === false ? 'bg-red-400' : ''}`}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          defaultValue={props.value}
          maxLength={props.maxLength}
          ref={ref}
          onBlur={props.onBlur}
          onChange={props.onChange}
          readOnly={props.readOnly}
          max={props.blockFuture ? moment().format('YYYY-MM-DD') : null}
        />
      </div>
    </>
  );
});

export default BaseInput;
