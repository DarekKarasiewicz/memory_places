import BaseIcon from './BaseIcon';

const AcceptIcon = ({ className, color }) => {
  return (
    <BaseIcon className={className} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
      <path d='M9 12l2 2l4 -4' />
    </BaseIcon>
  );
};

export default AcceptIcon;
