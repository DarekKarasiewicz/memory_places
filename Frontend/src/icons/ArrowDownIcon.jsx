import BaseIcon from './BaseIcon';

const ArrowDownIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M17 13v-6l-5 4l-5 -4v6l5 4z' />
    </BaseIcon>
  );
};

export default ArrowDownIcon;
