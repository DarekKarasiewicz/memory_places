import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ForumMenu from './SideMenu/ForumMenu';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import ForumContent from './Content/ForumContent.js';
import Loader from 'Loader/Loader.js';
import ForumPostHolder from './Content/ForumPostHolder';
import ForumContentPosts from './Content/ForumContentPosts';
import ScrollToTopButton from 'ScrollToTopButton/ScrollToTopButton';
import { useSelector } from 'react-redux';
import { selectModals } from 'Redux/modalsSlice';
import ForumPostModal from 'Modals/ForumPostModal';
import NotificationModal from 'Modals/NotificationModal';
import ConfirmationModal from 'Modals/ConfirmationModal';
import { selectConfirmationModal } from 'Redux/confirmationModalSlice';
import { selectNotificationModal } from 'Redux/notificationModalSlice';

function ForumMainPage() {
  const { placeid, postid } = useParams();
  const modalData = useSelector(selectModals);
  const confirmationModal = useSelector(selectConfirmationModal);
  const notificationModal = useSelector(selectNotificationModal);

  const ProperComponent = () => {
    if (placeid && postid) {
      return <ForumPostHolder />;
    } else if (placeid) {
      return <ForumContentPosts placeId={placeid} />;
    } else if (!placeid && !postid) {
      return <ForumContent />;
    } else {
      return <div>Something went wrong!</div>;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-64 p-4 flex justify-center shadow-lg bg-mainBgColor'>
          <ForumMenu />
        </div>
        <div className='w-full flex flex-col relative'>
          <ContentNavbar />
          <div className='px-10 py-8 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col items-center gap-6 h-full'>
            <ProperComponent />
          </div>
          <ScrollToTopButton />
        </div>
        {modalData.isForumPostModalOpen && <ForumPostModal />}
        {notificationModal.isNotificationModalOpen && <NotificationModal />}
        {confirmationModal.isConfirmationModalOpen && <ConfirmationModal />}
      </div>
    </Suspense>
  );
}

export default ForumMainPage;
