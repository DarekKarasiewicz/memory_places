import BaseIcon from './BaseIcon';

const DrawLineIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 17l6 -6l4 4l8 -8' />
    </BaseIcon>
  );
};

export default DrawLineIcon;
