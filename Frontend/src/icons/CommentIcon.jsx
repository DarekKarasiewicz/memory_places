import BaseIcon from './BaseIcon';

const CommentIcon = ({ className, onClick, color }) => {
  return (
    <BaseIcon className={className} onClick={onClick} color={color}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1' />
    </BaseIcon>
  );
};

export default CommentIcon;
