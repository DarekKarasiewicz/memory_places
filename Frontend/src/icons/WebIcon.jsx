import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';

const WebIcon = ({ className }) => {
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
      <path d='M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4' />
      <path d='M11.5 3a16.989 16.989 0 0 0 -1.826 4' />
      <path d='M12.5 3a16.989 16.989 0 0 1 1.828 4' />
      <path d='M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4' />
      <path d='M11.5 21a16.989 16.989 0 0 1 -1.826 -4' />
      <path d='M12.5 21a16.989 16.989 0 0 0 1.828 -4' />
      <path d='M2 10l1 4l1.5 -4l1.5 4l1 -4' />
      <path d='M17 10l1 4l1.5 -4l1.5 4l1 -4' />
      <path d='M9.5 10l1 4l1.5 -4l1.5 4l1 -4' />
    </svg>
  );
};

export default WebIcon;
