import { useState } from 'react';

function BaseInput(props) {
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
        <input
          className={`block w-${props.width ? props.width : 'full'} rounded-l-lg rounded-r-lg`}
          type={props.type}
          value={value}
          onChange={handleChange}
          placeholder={props.placeholder ? props.placeholder : ''}
          name={props.name}
        ></input>
      </div>
    </>
  );
}

export default BaseInput;
