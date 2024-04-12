import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';

const WikiIcon = ({ className }) => {
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
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 4.984h2' />
      <path d='M8 4.984h2.5' />
      <path d='M14.5 4.984h2.5' />
      <path d='M22 4.984h-2' />
      <path d='M4 4.984l5.455 14.516l6.545 -14.516' />
      <path d='M9 4.984l6 14.516l6 -14.516' />
    </svg>
  );
};

export default WikiIcon;
