import BaseIcon from './BaseIcon';

const HelpIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M12 16v.01' />
      <path d='M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483' />
    </BaseIcon>
  );
};

export default HelpIcon;
