import StatisticsSection from './ContentSections/StatisticsSection';
import UserManagementSection from './ContentSections/UserManagementSection';
import PlaceManagementSection from './ContentSections/PlaceManagamentSection';

function Content() {
  return (
    <>
      <div className='px-10 py-8 bg-slate-100 flex flex-col gap-6 h-full'>
        {/* <StatisticsSection /> */}
        {/* <UserManagementSection /> */}
        <PlaceManagementSection />
      </div>
    </>
  );
}

export default Content;
