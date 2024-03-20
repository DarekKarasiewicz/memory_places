import { useDispatch, useSelector } from 'react-redux';
import { changeSection } from '../../Redux/contentSectionSlice';
import { useState } from 'react';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';

function AdminMenu() {
  const dispatch = useDispatch();
  const contentSection = useSelector((state) => state.contentSection.section);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { icon: 'statistics_icon', name: 'Statystki strony', section: 'StatisticsSection' },
    {
      icon: 'user_group_icon',
      name: 'Zarządzanie użytkownikami',
      section: 'UserManagementSection',
    },
    {
      icon: 'places_icon',
      name: 'Zarządzanie istniejącymi miejscami',
      section: 'PlaceManagementSection',
    },
    {
      icon: 'var_changes_icon',
      name: 'Zarządzanie zmiennymi miejsc',
      section: 'PlaceManagementSection',
    },
    { icon: 'verification_icon', name: 'Weryfikacja miejsc', section: 'PlaceManagementSection' },
    {
      icon: 'web_changes_icon',
      name: 'Historia zmian na stronie',
      section: 'PlaceManagementSection',
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
