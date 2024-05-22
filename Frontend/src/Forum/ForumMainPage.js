import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ForumMenu from './SideMenu/ForumMenu';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/ForumContent.js';
import Loader from 'Loader/Loader.js';
import ForumPostHolder from './Content/ForumPostHolder';
import ForumContentPosts from './Content/ForumContentPosts';
import ScrollToTopButton from 'ScrollToTopButton/ScrollToTopButton';

function ForumMainPage() {
  const { placeid, postid } = useParams();

  const ProperComponent = () => {
    if (placeid && postid) {
      return <ForumPostHolder />;
    } else if (placeid) {
      return <ForumContentPosts />;
    } else if (!placeid && !postid) {
      return <Content />;
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
      </div>
    </Suspense>
  );
}

export default ForumMainPage;
