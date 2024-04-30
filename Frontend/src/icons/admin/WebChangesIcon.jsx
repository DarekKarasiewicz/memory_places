import BaseIcon from '../BaseIcon';

const WebChangesIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M7 10h14l-4 -4' />
      <path d='M17 14h-14l4 4' />
    </BaseIcon>
  );
};

export default WebChangesIcon;
