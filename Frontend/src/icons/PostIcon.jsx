import BaseIcon from './BaseIcon';

const PostIcon = ({ className, onClick, color }) => {
  return (
    <BaseIcon className={className} onClick={onClick} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 9h8' />
      <path d='M8 13h6' />
      <path d='M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z' />
    </BaseIcon>
  );
};

export default PostIcon;
