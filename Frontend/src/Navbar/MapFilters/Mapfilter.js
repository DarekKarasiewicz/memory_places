import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseInput from '../../Base/BaseInput';
import BaseSelect from '../../Base/BaseSelect';
import BaseButton from '../../Base/BaseButton';
import { useDispatch } from 'react-redux';
import { filterPlaces } from '../../Redux/allMapPlacesSlice';
import { useTranslation } from 'react-i18next';

function MapFilter() {
  const [isActive, setIsActive] = useState(false);
  const [selectedSortOfOption, setSelectedSortOfOption] = useState('all');
  const [selectedTypeOption, setSelectedTypeOption] = useState('all');
  const [selectedPeriodOption, setSelectedPeriodOption] = useState('all');
  const [textValue, setTextValue] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleSelectSortOfChange = (event) => {
    setSelectedSortOfOption(event.target.value);
  };

  const handleSelectTypeChange = (event) => {
    setSelectedTypeOption(event.target.value);
  };

  const handleSelectPeriodChange = (event) => {
    setSelectedPeriodOption(event.target.value);
  };

  const handleTextValueChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleFilterChange = () => {
    dispatch(
      filterPlaces({
        name: textValue,
        sortof: selectedSortOfOption,
        type: selectedTypeOption,
        period: selectedPeriodOption,
      }),
    );
  };

  //For each options later will be added more 9 options from client
  const sortof_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.existing'), value: 'existing' },
    { label: t('modal.non_existing'), value: 'non_existing' },
    { label: t('modal.commemorative_plaque'), value: 'commemorative_plaque' },
    { label: t('modal.commemorative_monument'), value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.war_cemetery'), value: 'war_cemetery' },
    { label: t('modal.civil_cemetery'), value: 'civil_cemetery' },
    { label: t('modal.burial_site'), value: 'burial_site' },
    { label: t('modal.execution_site'), value: 'execution_site' },
    { label: t('modal.battlefield'), value: 'battlefield' },
    { label: t('modal.archaeological_site'), value: 'archaeological_site' },
    { label: t('modal.wayside_shrine'), value: 'wayside_shrine' },
    { label: t('modal.historical_monument'), value: 'historical_monument' },
  ];

  const period_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.poland_before_third_partition'), value: 'poland_before_third_partition' },
    { label: t('modal.napoleonic_wars'), value: 'napoleonic_wars' },
    { label: t('modal.poland_after_partitions'), value: 'poland_after_partitions' },
    { label: t('modal.world_war_I'), value: 'world_war_I' },
    { label: t('modal.interwar_period'), value: 'interwar_period' },
    { label: t('modal.world_war_II'), value: 'world_war_II' },
    { label: t('modal.stalinist_period'), value: 'stalinist_period' },
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
          className='absolute top-0 right-0 flex gap-2 w-72 h-screen p-3 bg-slate-300 rounded-s-lg z-10'
        >
          <div className='flex flex-col gap-y-3 justify-start items-center'>
            <div className='text-2xl border-b-2 border-black p-2'>{t('common.filter1')}</div>
            <div className='flex flex-col gap-2'>
              <BaseInput
                type='text'
                label={t('common.name')}
                name={t('common.name')}
                value={textValue}
                onChange={handleTextValueChange}
              />
              <BaseSelect
                label={t('common.type_of')}
                name={t('common.type_of')}
                value={selectedSortOfOption}
                options={sortof_options}
                onChange={handleSelectSortOfChange}
              />
              <BaseSelect
                label={t('common.type')}
                name={t('common.type')}
                value={selectedTypeOption}
                options={type_options}
                onChange={handleSelectTypeChange}
              />
              <BaseSelect
                label={t('common.period')}
                name={t('common.period')}
                value={selectedPeriodOption}
                options={period_options}
                onChange={handleSelectPeriodChange}
              />
            </div>
            <BaseButton onClick={handleFilterChange} name={t('common.filter2')} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MapFilter;
