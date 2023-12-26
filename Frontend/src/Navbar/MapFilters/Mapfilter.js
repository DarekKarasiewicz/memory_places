import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseInput from '../../Base/BaseInput';
import BaseSelect from '../../Base/BaseSelect';

function MapFilter() {
  const [isActive, setIsActive] = useState(false);
  const [selectedTypeOption, setSelectedTypeOption] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleSelectTypeChange = (name, value) => {
    setSelectedTypeOption(value);
  };

  const handleTextValueChange = (name, value) => {
    setTextValue(value);
  };

  //For each options later will be added more 9 options from client
  const sortof_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Istniejące', value: 'existing' },
    { label: 'Nieistniejące', value: 'non_existing' },
    { label: 'Tablica upamiętniająca', value: 'commemorative_plaque' },
    { label: 'Pomnik upamiętniający', value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Cmentarz wojenny', value: 'war_emetery' },
    { label: 'Cmentarz cywilny', value: 'civilian_cemetery' },
    { label: 'Miejsce pochówku', value: 'burial_site' },
    { label: 'Miejsce egzekucji, straceń', value: 'place_of_executions' },
    { label: 'Miejsce bitwy, potyczki', value: 'place_of_battle_skirmish' },
    { label: 'Miejsce archeologiczne', value: 'archaeological_site' },
    { label: 'Kapliczka', value: 'chapel' },
    { label: 'Zabytek', value: 'monument' },
  ];

  const period_options = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Polska przed 3cim rozbiorem  (< 1795)', value: 'poland_before_third_partition' },
    { label: 'Wojny Napoleońskie (1799 – 1815)', value: 'napoleonic_wars' },
    { label: 'Polska po rozbiorach (1795 – 1914)', value: 'poland_after_partitions' },
    { label: 'I Wojna Światowa (1914 – 1918)', value: 'world_war_I' },
    { label: 'Okres Międzywojenny (1918 – 1939)', value: 'interwar_period' },
    { label: 'II Wojna Światowa (1939 – 1945)', value: 'world_war_II' },
    { label: 'Okres Stalinowski (1945 – 1953)', value: 'stalinist_period' },
  ];

  return (
    <div className='flex'>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`rounded-full border-2 h-12 w-12 border-black flex justify-center items-center cursor-pointer bg-slate-300 ${
          isActive ? 'right-72 absolute mr-3' : ''
        }`}
        onClick={handleClick}
      >
        <img
          src={`./assets/${!isActive ? 'filter_icon' : 'cancel_icon'}.svg`}
          alt={`${!isActive ? 'filter_icon' : 'cancel_icon'}`}
          className='h-8 w-8'
        ></img>
      </motion.div>
      {isActive && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute top-0 right-0 flex gap-2 w-72 h-screen p-3 bg-slate-300 rounded-s-lg'
        >
          <div className='flex flex-col gap-y-3 justify-start items-center'>
            <div className='text-2xl border-b-2 border-black p-2'>Filtry</div>
            <div className='flex flex-col gap-2'>
              <BaseInput
                type='text'
                label='Nazwa'
                name='Nazwa'
                value={textValue}
                onChange={handleTextValueChange}
              />
              <BaseSelect
                label='Rodzaj'
                name='Rodzaj'
                value={selectedTypeOption}
                options={sortof_options}
                onChange={handleSelectTypeChange}
              />
              <BaseSelect
                label='Typ'
                name='Typ'
                value={selectedTypeOption}
                options={type_options}
                onChange={handleSelectTypeChange}
              />
              <BaseSelect
                label='Okres'
                name='Okres'
                value={selectedTypeOption}
                options={period_options}
                onChange={handleSelectTypeChange}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MapFilter;
