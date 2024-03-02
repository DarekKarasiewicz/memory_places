import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';
import { useTranslation } from 'react-i18next';

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

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>{t('user.notifications')}</div>
      <div className='flex flex-col items-center py-2 gap-2'>
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
    </div>
  );
}

export default NotificiationsSettings;
