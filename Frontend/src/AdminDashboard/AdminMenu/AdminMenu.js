import { useDispatch } from 'react-redux';
import { changeSection } from 'Redux/contentSectionSlice';
import { useState, useEffect } from 'react';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

function AdminMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(0);
  const [cookies, removeCookie] = useCookies(['user']);
  const user = cookies.user;

  const menuItems = [
    {
      icon: 'statistics',
      name: t('admin.common.statistics_title'),
      section: 'StatisticsSection',
      isAdmin: true,
    },
    {
      icon: 'userGroup',
      name: t('admin.common.user_manage_title'),
      section: 'UserManagementSection',
    },
    {
      icon: 'places',
      name: t('admin.common.place_manage_title'),
      section: 'PlaceManagementSection',
    },
    {
      icon: 'trails',
      name: t('admin.common.trail_manage_title'),
      section: 'TrailManagementSection',
    },
    {
      icon: 'varChanges',
      name: t('admin.common.var_manage_title'),
      section: 'PlaceVariableManagementSection',
      isAdmin: true,
    },
    {
      icon: 'verification',
      name: t('admin.common.verification_title'),
      section: 'PlaceVerificationSection',
    },
    {
      icon: 'webChanges',
      name: t('admin.common.history_title'),
      section: 'ChangesHistorySection',
      isAdmin: true,
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.isAdmin) {
      return user.admin;
    }
    return true;
  });

  useEffect(() => {
    if (user.master) {
      dispatch(changeSection('UserManagementSection'));
    } else {
      dispatch(changeSection('StatisticsSection'));
    }
  }, []);

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
          {filteredMenuItems.map((item, index) => (
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
