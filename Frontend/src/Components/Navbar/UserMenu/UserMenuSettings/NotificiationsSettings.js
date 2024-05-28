import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import BaseButton from 'Components/Base/BaseButton';
import BaseSelect from 'Components/Base/BaseSelect';
import NotificationIcon from 'icons/NotificationIcon';

function NotificiationsSettings() {
  const [selectedNotifyLevelOption, setSelectedNotifyLevelOption] = useState('');
  const { t } = useTranslation();

  const handleSelectNotifyLevelChange = (value) => {
    setSelectedNotifyLevelOption(value);
  };

  const notify_level_options = [
    { label: t('user.all'), value: 'all' },
    { label: t('user.important'), value: 'important' },
    { label: t('user.none'), value: 'none' },
  ];

  const message = t('user.notificiation_info');

  const parentItem = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div variants={parentItem} initial='hidden' animate='visible'>
      <div className='border-b-2 border-textColor pr-2 pb-2 pl-2 text-2xl flex gap-2'>
        <NotificationIcon />
        <span>{t('user.notifications')}</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <BaseSelect
            label={t('user.notificiation_level')}
            name='NotifyLevel'
            value={selectedNotifyLevelOption}
            options={notify_level_options}
            onChange={handleSelectNotifyLevelChange}
          />
        </div>
        <span className='text-center italic text-lg whitespace-pre-line'>{message}</span>
        <BaseButton name={t('user.confirm')} btnBg='blue' className='mt-2' />
      </div>
    </motion.div>
  );
}

export default NotificiationsSettings;
