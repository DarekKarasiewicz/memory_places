function AdminMenuItem(props) {
  return (
    <>
      <div
        className={`${
          props.active ? 'border-l-4 pl-2 border-cyan-600 text-cyan-600' : ''
        } flex items-center gap-3 p-1 text-textColor hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer transition`}
        onClick={props.onClick}
      >
        <img src={`./assets/admin/${props.icon}.svg`} alt={props.icon} className='h-8 w-8'></img>
        <span className='leading-5'>{props.name}</span>
      </div>
    </>
  );
}

export default AdminMenuItem;
