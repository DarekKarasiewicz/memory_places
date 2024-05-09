import BaseIcon from './BaseIcon';

const SearchIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
      <path d='M21 21l-6 -6' />
    </BaseIcon>
  );
};

export default SearchIcon;
