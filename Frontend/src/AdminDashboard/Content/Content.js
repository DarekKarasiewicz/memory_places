import { useSelector } from 'react-redux';
import StatisticsSection from './ContentSections/StatisticsSection';
import UserManagementSection from './ContentSections/UserManagementSection';
import PlaceManagementSection from './ContentSections/PlaceManagementSection';
import PlaceVariableManagementSection from './ContentSections/PlaceVariableManagementSection';
import ChangesHistorySection from './ContentSections/ChangesHistorySection';
import PlaceVerificationSection from './ContentSections/PlaceVerificationSection';

const contentSectionMap = {
  StatisticsSection,
  UserManagementSection,
  PlaceManagementSection,
  PlaceVariableManagementSection,
  PlaceVerificationSection,
  ChangesHistorySection,
};

function Content() {
  const activeContentSection = useSelector((state) => state.contentSection.section);
  const ActiveComponent = contentSectionMap[activeContentSection];

  return (
    <>
      <div className='px-10 py-8 bg-slate-100 flex flex-col gap-6 h-full'>
        <ActiveComponent />
      </div>
    </>
  );
}

export default Content;
