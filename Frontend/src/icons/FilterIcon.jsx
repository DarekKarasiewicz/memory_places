import BaseIcon from './BaseIcon';

const FilterIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
      <path d='M4 6l8 0' />
      <path d='M16 6l4 0' />
      <path d='M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
      <path d='M4 12l2 0' />
      <path d='M10 12l10 0' />
      <path d='M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
      <path d='M4 18l11 0' />
      <path d='M19 18l1 0' />
    </BaseIcon>
  );
};

export default FilterIcon;
