import BaseIcon from './BaseIcon';

const RefreshIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
      <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
    </BaseIcon>
  );
};

export default RefreshIcon;
