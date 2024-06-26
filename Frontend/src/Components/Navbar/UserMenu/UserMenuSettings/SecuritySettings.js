import { motion } from 'framer-motion';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { notificationModalActions } from 'Redux/notificationModalSlice';

import ShieldLockIcon from 'icons/ShieldLockIcon';
import BaseButton from 'Components/Base/BaseButton';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function SecuritySettings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const handlePasswordReset = async () => {
    try {
      await axios.get(`${appPath}/memo_places/reset_password/pk=${user.user_id}`);
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.reset_password_email')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    } catch (error) {
      dispatch(notificationModalActions.changeType('error'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

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
      <div className='flex items-center gap-2 border-b-2 border-textColor px-2 pb-2'>
        <ShieldLockIcon />
        <span className={`text-${fontSize}-2xl`}>{t('user.security')}</span>
      </div>
      <div className='p-4'>
        <div className='flex flex-col items-center gap-2'>
          <p className={`text-center text-${fontSize}-xl`}>{t('user.reset_pass_info')}</p>
          <BaseButton
            name={t('user.reset_pass_btn')}
            breakWidth={true}
            className='mt-4 px-4 py-3'
            btnBg='blue'
            onClick={() => handlePasswordReset()}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SecuritySettings;
