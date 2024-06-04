import { forwardRef } from 'react';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const BaseTextarea = forwardRef(function BaseTextarea(props, ref) {
  const { fontSize } = useFontSize();

  return (
    <>
      {(props.label || props.secondLabel) && (
        <div className='flex justify-between items-center'>
          <label className={`block pl-1 pb-1 text-${fontSize}-base`}>{props.label}</label>
          <label className={`block pr-1 text-${fontSize}-sm`}>{props.secondLabel}</label>
        </div>
      )}
      <textarea
        className={`block w-${
          props.width ? props.width : 'full'
        } rounded-l-lg rounded-r-lg p-2 text-black drop-shadow-sm shadow-itemShadow focus:outline-contrastColor text-${fontSize}-base resize-none ${
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
        onSelect={props.onSelect}
        readOnly={props.readOnly}
      />
    </>
  );
});

export default BaseTextarea;
