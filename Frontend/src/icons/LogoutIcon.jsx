import BaseIcon from './BaseIcon';

const LogoutIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
      <path d='M9 12h12l-3 -3' />
      <path d='M18 15l3 -3' />
    </BaseIcon>
  );
};

export default LogoutIcon;
