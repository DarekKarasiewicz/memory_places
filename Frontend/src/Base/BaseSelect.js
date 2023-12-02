import { useState } from 'react';

function BaseSelect(props) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    props.onChange(props.name, value);
  };

  return (
    <>
      <div className='w-full'>
        <label className='block pl-2 text-lg'>test</label>
        <select
          className={`block w-${props.width ? props.width : 'full'} rounded-l-lg rounded-r-lg`}
          value={value}
          onChange={handleChange}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
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
}

export default BaseSelect;
