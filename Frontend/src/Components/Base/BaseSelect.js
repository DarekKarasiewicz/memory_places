import { forwardRef } from 'react';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

const BaseSelect = forwardRef(function BaseSelect(props, ref) {
  const { fontSize } = useFontSize();

  return (
    <>
      <div className={`${!props.disabledParentFull ? 'w-full' : ''}`}>
        {!props.disabledLabel && (
          <label className={`block pl-1 pb-1 text-${fontSize}-base`}>{props.label}</label>
        )}
        <select
          className={`block w-${
            props.width ? props.width : 'full'
          } rounded-l-lg rounded-r-lg p-2 text-black drop-shadow-sm shadow-itemShadow focus:outline-contrastColor ${
            props.isValid === false ? 'bg-red-400' : ''
          }`}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
          ref={ref}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          disabled={props.readOnly}
        >
          {props.options.map((option, index) => (
            <option key={index} value={option.value} data-id={option.id ? option.id : index}>
              <span className={`text-${fontSize}-base`}>{option.label}</span>
            </option>
          ))}
        </select>
      </div>
    </>
  );
});

export default BaseSelect;
