import BaseIcon from './BaseIcon';

const RedoIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M15 14l4 -4l-4 -4' />
      <path d='M19 10h-11a4 4 0 1 0 0 8h1' />
    </BaseIcon>
  );
};

export default RedoIcon;
