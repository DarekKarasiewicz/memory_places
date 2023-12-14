import { useState, useEffect } from 'react';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';

function FormModal(props) {
  const [inputValues, setInputValues] = useState({
    testInput: '',
    testInput2: '',
    testInput3: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  //temporaty fragment of code
  //for fast form validation
  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setSelectedOption(value);
  };

  const options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
    { label: 'option3', value: 'option3' },
  ];

  const handleTextAreaChange = (value) => {
    setTextAreaValue(value);
  };

  return (
    <>
      <BaseModal title={props.title} isOpen={props.isOpen} closeModal={props.closeModal}>
        <div className='p-2 max-h-[75vh] overflow-y-auto'>
          {/* example of inputs in one line */}
          <div className='flex flex-row'>
            <BaseInput
              type='text'
              width='1/2'
              placeholder='Search...'
              name='testInput'
              onChange={handleInputChange}
            />
            <BaseInput type='text' width='1/4' name='testInput2' onChange={handleInputChange} />
          </div>
          {/* end */}
          {/* example of other inputs */}
          <BaseInput type='number' name='testInput3' onChange={handleInputChange} />
          <BaseSelect
            name='exampleSelect'
            value={selectedOption}
            options={options}
            onChange={handleSelectChange}
          />
          <BaseTextarea value={textAreaValue} onChange={handleTextAreaChange} rows='6' />
          {/* end */}
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton name='Confirm'></BaseButton>
        </div>
      </BaseModal>
    </>
  );
}

export default FormModal;
