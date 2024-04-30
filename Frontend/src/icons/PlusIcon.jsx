import BaseIcon from './BaseIcon';

const PlusIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 5l0 14' />
      <path d='M5 12l14 0' />
    </BaseIcon>
  );
};

export default PlusIcon;
