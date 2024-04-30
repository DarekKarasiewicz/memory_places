import BaseIcon from './BaseIcon';

const ContactIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z' />
      <path d='M19 16h-12a2 2 0 0 0 -2 2' />
      <path d='M9 8h6' />
    </BaseIcon>
  );
};

export default ContactIcon;
