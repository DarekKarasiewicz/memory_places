function BaseRadioGroup({ readOnly, options, selectedValue, onChange }) {
  return (
    <>
      <div className='flex gap-4'>
        {options.map((option) => (
          <label key={option.value} className='flex items-center gap-2 text-base cursor-pointer'>
            <input
              className='w-4 h-4 cursor-pointer'
              type='radio'
              name={option.name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              disabled={readOnly}
            />
            {option.label}
          </label>
        ))}
      </div>
    </>
  );
}

export default BaseRadioGroup;
