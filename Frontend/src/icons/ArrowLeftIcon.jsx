import BaseIcon from './BaseIcon';

const ArrowLeftIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M11 17h6l-4 -5l4 -5h-6l-4 5z' />
    </BaseIcon>
  );
};

export default ArrowLeftIcon;
