import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';

const PreferencesIcon = ({ className }) => {
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
      <path d='M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4' />
      <path d='M14.5 5.5l4 4' />
      <path d='M12 8l-5 -5l-4 4l5 5' />
      <path d='M7 8l-1.5 1.5' />
      <path d='M16 12l5 5l-4 4l-5 -5' />
      <path d='M16 17l-1.5 1.5' />
    </svg>
  );
};

export default PreferencesIcon;
