function RoleSettings() {
  return (
    <div>
      <div className='border-b-2 border-black pr-2 pb-2 pl-2'>Role</div>
      <div className='flex flex-col items-center py-2 gap-2'>
        <div className='flex flex-col items-center'>
          Your current role:
          <span className='capitalize font-medium'>ADMIN</span>
        </div>
        {/* In future check if role of current user is USER give this information otherwise no  */}
        <span className='text-center italic text-lg'>
          If you want to become moderator, send your application via form in user help section.
        </span>
      </div>
    </div>
  );
}

export default RoleSettings;
