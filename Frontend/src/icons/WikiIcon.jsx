import BaseIcon from './BaseIcon';

const WikiIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 4.984h2' />
      <path d='M8 4.984h2.5' />
      <path d='M14.5 4.984h2.5' />
      <path d='M22 4.984h-2' />
      <path d='M4 4.984l5.455 14.516l6.545 -14.516' />
      <path d='M9 4.984l6 14.516l6 -14.516' />
    </BaseIcon>
  );
};

export default WikiIcon;
