import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';

const CheckIcon = ({ className, onClick, color }) => {
  const theme = useTheme();
  const [strokeColor, setStrokeColor] = useState(null);

  useEffect(() => {
    if (!color) {
      const newStrokeColor = theme.theme === 'dark' ? '#ffffff' : '#000000';
      setStrokeColor(newStrokeColor);
    } else {
      setStrokeColor(color);
    }
  }, [theme, color]);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${className ? className : 'h-8 w-8'} flex-shrink-0`}
      onClick={onClick ? onClick : undefined}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke={strokeColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 12l5 5l10 -10' />
    </svg>
  );
};

export default CheckIcon;
