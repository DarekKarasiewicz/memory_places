import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeSwitcher/ThemeContext';

const CivilCemeteryIcon = ({ className }) => {
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
      <path d='M7 16.17v-9.17a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v9.171' />
      <path d='M12 7v5' />
      <path d='M10 9h4' />
      <path d='M5 21v-2a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v2h-14z' />
    </svg>
  );
};

export default CivilCemeteryIcon;
