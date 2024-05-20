import BaseIcon from './BaseIcon';

const TrendIcon = ({ className, onClick }) => {
  return (
    <BaseIcon className={className} onClick={onClick}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 17l6 -6l4 4l8 -8' />
      <path d='M14 7l7 0l0 7' />
    </BaseIcon>
  );
};

export default TrendIcon;
