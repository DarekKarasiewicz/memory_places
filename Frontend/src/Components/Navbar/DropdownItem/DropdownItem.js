import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import MapIcon from 'icons/MapIcon';
import ForumIcon from 'icons/ForumIcon';
import UserIcon from 'icons/UserIcon';

function DropdownItem({ icon, name, onClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useTranslation();

  const iconComponents = {
    map: <MapIcon className='h-8 w-8' />,
    forum: <ForumIcon className='h-8 w-8' />,
    user: <UserIcon className='h-8 w-8' />,
  };

  const IconComponent = iconComponents[icon] || null;

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const variantsToFade = {
    hidden: { opacity: 0, x: '-8%' },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div className='flex relative items-center' onClick={onClick}>
        <div
          className='h-12 w-12 flex justify-center items-center cursor-pointer z-10 relative'
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {IconComponent}
        </div>
        {isHovering && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={variantsToFade}
            transition={{ duration: 0.5 }}
            className='h-12 w-auto absolute left-6 bg-mainBgColor text-textColor pointer-events-none z-0 px-2 flex justify-end rounded-lg items-center leading-4'
          >
            <span className='ml-6 capitalize text-left'>
              {name ? name : t('common.not_given_name')}
            </span>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default DropdownItem;
