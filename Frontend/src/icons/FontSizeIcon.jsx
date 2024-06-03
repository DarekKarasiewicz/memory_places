import BaseIcon from './BaseIcon';

const FontSizeIcon = ({ className }) => {
  return (
    <BaseIcon className={className}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 7v-2h13v2' />
      <path d='M10 5v14' />
      <path d='M12 19h-4' />
      <path d='M15 13v-1h6v1' />
      <path d='M18 12v7' />
      <path d='M17 19h2' />
    </BaseIcon>
  );
};

export default FontSizeIcon;
