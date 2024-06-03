import { useSelector } from 'react-redux';

import StatisticsSection from './ContentSections/StatisticsSection';
import UserManagementSection from './ContentSections/UserManagementSection';
import PlaceManagementSection from './ContentSections/PlaceManagementSection';
import TrailManagementSection from './ContentSections/TrailManagementSection';
import ObjectVariableManagementSection from './ContentSections/ObjectVariableManagementSection';
import ObjectVerificationSection from './ContentSections/ObjectVerificationSection';
import PostManagementSection from './ContentSections/PostManagementSection';
import CommentManagementSection from './ContentSections/CommentManagementSection';
import ContactSection from './ContentSections/ContactSection';
import ChangesHistorySection from './ContentSections/ChangesHistorySection';

const contentSectionMap = {
  StatisticsSection,
  UserManagementSection,
  PlaceManagementSection,
  TrailManagementSection,
  ObjectVariableManagementSection,
  ObjectVerificationSection,
  PostManagementSection,
  CommentManagementSection,
  ContactSection,
  ChangesHistorySection,
};

function Content() {
  const activeContentSection = useSelector((state) => state.contentSection.section);
  const ActiveComponent = contentSectionMap[activeContentSection];

  return (
    <>
      <div className='px-10 py-8 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col gap-6 h-full'>
        <ActiveComponent />
      </div>
    </>
  );
}

export default Content;
