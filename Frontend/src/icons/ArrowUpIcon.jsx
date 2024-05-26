import BaseIcon from './BaseIcon';

const ArrowUpIcon = ({ className, onClick }) => {
  return (
    <BaseIcon className={className} onClick={onClick}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M17 11v6l-5 -4l-5 4v-6l5 -4z' />
    </BaseIcon>
  );
};

export default ArrowUpIcon;
