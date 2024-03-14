function AdminMenuItem(props) {
  return (
    <>
      <div className='flex items-center gap-3 p-1 hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer'>
        <img src={`./assets/admin/${props.icon}.svg`} alt={props.icon} className='h-8 w-8'></img>
        <span className='leading-5'>{props.name}</span>
      </div>
    </>
  );
}

export default AdminMenuItem;
