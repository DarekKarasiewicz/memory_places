import BaseIcon from './BaseIcon';

const UndoIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 14l-4 -4l4 -4' />
      <path d='M5 10h11a4 4 0 1 1 0 8h-1' />
    </BaseIcon>
  );
};

export default UndoIcon;
