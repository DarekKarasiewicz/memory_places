import { useState } from 'react';
import BaseButton from '../../../Base/BaseButton';
import BaseSelect from '../../../Base/BaseSelect';

function NotificiationsSettings() {
  const [selectedNotifyLevelOption, setSelectedNotifyLevelOption] = useState('');

  const handleSelectNotifyLevelChange = (value) => {
    setSelectedNotifyLevelOption(value);
  };

  const notify_level_options = [
    { label: 'All', value: 'all' },
    { label: 'Important', value: 'important' },
    { label: 'None', value: 'none' },
  ];

  const message = `All - all notifications will be displayed in user notification section. \n Important - Only important notifications will be displayed like (Consideration of point reporting, ...). \n None - No message will be displayed.`;

  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Notifications</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          Notificiations level:
          <BaseSelect
            name='NotifyLevel'
            value={selectedNotifyLevelOption}
            options={notify_level_options}
            onChange={handleSelectNotifyLevelChange}
          />
        </div>
        {/* Describe what each level mean */}
        <span className='text-center italic text-lg whitespace-pre-line'>{message}</span>
        <BaseButton name='Zatwierdź' className='mt-2' />
      </div>
    </div>
  );
}

export default NotificiationsSettings;
