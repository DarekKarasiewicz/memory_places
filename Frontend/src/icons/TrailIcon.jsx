import BaseIcon from './BaseIcon';

const TrailIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4z' />
      <path d='M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5' />
    </BaseIcon>
  );
};

export default TrailIcon;
