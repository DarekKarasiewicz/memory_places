import BaseIcon from './BaseIcon';

const ArrowRightIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M13 7h-6l4 5l-4 5h6l4 -5z' />
    </BaseIcon>
  );
};

export default ArrowRightIcon;
