import AdminMenuItem from './AdminMenuItem/AdminMenuItem';

function AdminMenu() {
  const menuItems = [
    { icon: 'statistics_icon', name: 'Statystki strony' },
    { icon: 'user_group_icon', name: 'Zarządzanie użytkownikami' },
    { icon: 'places_icon', name: 'Zarządzanie istniejącymi miejscami' },
    { icon: 'verification_icon', name: 'Weryfikacja miejsc' },
    { icon: 'web_changes_icon', name: 'Historia zmian na stronie' },
    { icon: 'var_changes_icon', name: 'Zarządzanie zmiennymi miejsc' },
  ];

  return (
    <>
      <div className='flex flex-col gap-6 items-center'>
        <section className='w-32 h-32 flex justify-center items-center'>
          <img src='./assets/memorial_places_logo.png' alt='memorial place logo'></img>
        </section>
        <section className='flex flex-col gap-6'>
          {menuItems.map((item, index) => (
            <AdminMenuItem key={index} icon={item.icon} name={item.name} />
          ))}
        </section>
      </div>
    </>
  );
}

export default AdminMenu;
