import BaseIcon from './BaseIcon';

const SiteMapIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
      <path d='M15 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
      <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
      <path d='M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1' />
      <path d='M12 9l0 3' />
    </BaseIcon>
  );
};

export default SiteMapIcon;
