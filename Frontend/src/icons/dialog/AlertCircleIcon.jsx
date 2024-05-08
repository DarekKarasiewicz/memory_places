import BaseIcon from '../BaseIcon';

const AlertCircleIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M12 8v4' />
      <path d='M12 16h.01' />
    </BaseIcon>
  );
};

export default AlertCircleIcon;
