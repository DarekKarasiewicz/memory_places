import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { changeSection } from 'Redux/contentSectionSlice';
import { selectAdminData, adminDataActions } from 'Redux/adminDataSlice';

import AdminMenuItem from './AdminMenuItem/AdminMenuItem';

function AdminMenu() {
  const dispatch = useDispatch();
  const adminData = useSelector(selectAdminData);
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
      section: 'ObjectVariableManagementSection',
      isAdmin: true,
    },
    {
      icon: 'verification',
      name: t('admin.common.verification_title'),
      section: 'ObjectVerificationSection',
    },
    {
      icon: 'post',
      name: t('admin.common.post_manage_title'),
      section: 'PostManagementSection',
    },
    {
      icon: 'comment',
      name: t('admin.common.comment_manage_title'),
      section: 'CommentManagementSection',
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
    dispatch(adminDataActions.updateCurrentMenuOption(index));
    dispatch(changeSection(section));
  };

  useEffect(() => {
    if (adminData.currentMenuOption) {
      setActiveItem(adminData.currentMenuOption);
      dispatch(changeSection(menuItems[adminData.currentMenuOption].section));
    }
  }, []);

  return (
    <>
      <div className='flex flex-col gap-8 items-center'>
        <section className='w-32 h-32 mt-4 flex justify-center items-center'>
          <img
            src='./assets/memory_places_logo.png'
            alt='memorial place logo'
            className='h-full w-auto'
          ></img>
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
