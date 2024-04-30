import BaseIcon from '../BaseIcon';

const BurialSiteIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 21v-2a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v2h-14z' />
      <path d='M10 16v-5h-4v-4h4v-4h4v4h4v4h-4v5' />
    </BaseIcon>
  );
};

export default BurialSiteIcon;
