import { motion } from 'framer-motion';
import NotificationIcon from 'icons/NotificationIcon';
import PinIcon from 'icons/PinIcon';
import MapIcon from 'icons/MapIcon';
import SettingsIcon from 'icons/SettingsIcon';
import HelpIcon from 'icons/HelpIcon';
import ContactIcon from 'icons/ContactIcon';
import LogoutIcon from 'icons/LogoutIcon';

const AdminDropdownItem = (props) => {
  const iconComponents = {
    notification: <NotificationIcon />,
    pin: <PinIcon />,
    map: <MapIcon />,
    settings: <SettingsIcon />,
    help: <HelpIcon />,
    contact: <ContactIcon />,
    logout: <LogoutIcon />,
  };

  const IconComponent = iconComponents[props.icon] || null;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className='w-full h-12 cursor-pointer flex gap-2 items-center pl-2 rounded-md hover:text-contrastColor'
        onClick={props.onClick ? props.onClick : undefined}
      >
        {IconComponent}
        <div className='capitalize leading-5'>{props.name}</div>
      </motion.div>
    </>
  );
};

export default AdminDropdownItem;
