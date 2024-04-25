import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeSwitcher/ThemeContext';

const WaysideShrineIcon = ({ className }) => {
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
      <path d='M3 21l18 0' />
      <path d='M10 21v-4a2 2 0 0 1 4 0v4' />
      <path d='M10 5l4 0' />
      <path d='M12 3l0 5' />
      <path d='M6 21v-7m-2 2l8 -8l8 8m-2 -2v7' />
    </svg>
  );
};

export default WaysideShrineIcon;
