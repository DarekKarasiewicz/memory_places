import BaseIcon from './BaseIcon';

const UploadIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 3v4a1 1 0 0 0 1 1h4' />
      <path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
      <path d='M12 11v6' />
      <path d='M9.5 13.5l2.5 -2.5l2.5 2.5' />
    </BaseIcon>
  );
};

export default UploadIcon;
