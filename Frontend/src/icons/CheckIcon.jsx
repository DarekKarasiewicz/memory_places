import BaseIcon from './BaseIcon';

const CheckIcon = ({ className, onClick, color }) => {
  return (
    <BaseIcon className={className} onClick={onClick} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 12l5 5l10 -10' />
    </BaseIcon>
  );
};

export default CheckIcon;
