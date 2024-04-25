import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeSwitcher/ThemeContext';

const HistoricalMonumentIcon = ({ className }) => {
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
      <path d='M8 18l2 -13l2 -2l2 2l2 13' />
      <path d='M5 21v-3h14v3' />
      <path d='M3 21l18 0' />
    </svg>
  );
};

export default HistoricalMonumentIcon;
