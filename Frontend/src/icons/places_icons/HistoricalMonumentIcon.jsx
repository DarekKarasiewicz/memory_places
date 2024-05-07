import BaseIcon from '../BaseIcon';

const HistoricalMonumentIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 18l2 -13l2 -2l2 2l2 13' />
      <path d='M5 21v-3h14v3' />
      <path d='M3 21l18 0' />
    </BaseIcon>
  );
};

export default HistoricalMonumentIcon;
