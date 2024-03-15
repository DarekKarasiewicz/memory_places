import { useState } from 'react';
import AdminMenuItem from './AdminMenuItem/AdminMenuItem';

function AdminMenu() {
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { icon: 'statistics_icon', name: 'Statystki strony' },
    { icon: 'user_group_icon', name: 'Zarządzanie użytkownikami' },
    { icon: 'places_icon', name: 'Zarządzanie istniejącymi miejscami' },
    { icon: 'var_changes_icon', name: 'Zarządzanie zmiennymi miejsc' },
    { icon: 'verification_icon', name: 'Weryfikacja miejsc' },
    { icon: 'web_changes_icon', name: 'Historia zmian na stronie' },
  ];

  const handleItemClick = (index) => {
    setActiveItem(index);
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
              onClick={() => handleItemClick(index)}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default AdminMenu;
