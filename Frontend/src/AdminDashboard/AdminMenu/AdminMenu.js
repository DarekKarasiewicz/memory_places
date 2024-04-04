import { useDispatch } from 'react-redux';
import { changeSection } from '../../Redux/contentSectionSlice';
import { useState } from 'react';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';
import { useTranslation } from 'react-i18next';

function AdminMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    {
      icon: 'statistics_icon',
      name: t('admin.common.statistics_title'),
      section: 'StatisticsSection',
    },
    {
      icon: 'user_group_icon',
      name: t('admin.common.user_manage_title'),
      section: 'UserManagementSection',
    },
    {
      icon: 'places_icon',
      name: t('admin.common.place_manage_title'),
      section: 'PlaceManagementSection',
    },
    {
      icon: 'var_changes_icon',
      name: t('admin.common.var_manage_title'),
      section: 'PlaceVariableManagementSection',
    },
    {
      icon: 'verification_icon',
      name: t('admin.common.verification_title'),
      section: 'PlaceVerificationSection',
    },
    {
      icon: 'web_changes_icon',
      name: t('admin.common.history_title'),
      section: 'ChangesHistorySection',
    },
  ];

  const handleSectionChange = (index, section) => {
    setActiveItem(index);
    dispatch(changeSection(section));
  };

  return (
    <>
      <div className='flex flex-col gap-6 items-center'>
        <section className='w-32 h-32 flex justify-center items-center'>
          <img src='./assets/memorial_places_logo.png' alt='memorial place logo'></img>
        </section>
        <section className='flex flex-col gap-6'>
          {menuItems.map((item, index) => (
            <AdminMenuItem
              key={index}
              icon={item.icon}
              name={item.name}
              active={index === activeItem}
              onClick={() => handleSectionChange(index, item.section)}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default AdminMenu;
