import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeSwitcher/ThemeContext';

const UserGroupIcon = ({ className }) => {
  const theme = useTheme();
  const [strokeColor, setStrokeColor] = useState(null);

  useEffect(() => {
    const newStrokeColor = theme.theme === 'dark' ? '#ffffff' : '#000000';
    setStrokeColor(newStrokeColor);
  }, [theme]);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${className ? className : 'h-8 w-8'} flex-shrink-0`}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke={strokeColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1' />
      <path d='M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M17 10h2a2 2 0 0 1 2 2v1' />
      <path d='M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M3 13v-1a2 2 0 0 1 2 -2h2' />
    </svg>
  );
};

export default UserGroupIcon;
