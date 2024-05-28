import { useEffect, useState } from 'react';
import { useTheme } from '../Components/ThemeSwitcher/ThemeContext';

const BaseIcon = (props) => {
  const theme = useTheme();
  const [strokeColor, setStrokeColor] = useState(null);

  useEffect(() => {
    if (!props.color) {
      const newStrokeColor = theme.theme === 'dark' ? '#ffffff' : '#000000';
      setStrokeColor(newStrokeColor);
    } else {
      setStrokeColor(props.color);
    }
  }, [theme, props.color]);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${props.className ? props.className : 'h-8 w-8'} flex-shrink-0`}
      onClick={props.onClick ? props.onClick : undefined}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke={strokeColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {props.children}
    </svg>
  );
};

export default BaseIcon;
