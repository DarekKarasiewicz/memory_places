import { Suspense } from 'react';
import ForumMenu from './Content/ForumMenu';
import ContentNavbar from './ContentNavbar/ContentNavbar.js';
import Content from './Content/ForumContent.js';
import Loader from 'Loader/Loader.js';

function ForumMainPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='w-screen h-auto relative flex max-w-full overflow-x-hidden'>
        <div className='w-64 p-4 flex justify-center shadow-lg bg-mainBgColor'>
          <ForumMenu />
        </div>
        <div className='w-full flex flex-col'>
          <ContentNavbar />
          <Content />
        </div>
      </div>
    </Suspense>
  );
}

export default ForumMainPage;
