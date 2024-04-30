import BaseIcon from '../BaseIcon';

const WarCemeteryIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 3h6l3 7l-6 2l-6 -2z' />
      <path d='M12 12l-3 -9' />
      <path d='M15 11l-3 -8' />
      <path d='M12 19.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z' />
    </BaseIcon>
  );
};

export default WarCemeteryIcon;
