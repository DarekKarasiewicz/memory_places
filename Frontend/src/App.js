import { useState } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';
import FormModal from './Modals/FormModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-screen h-screen relative'>
      <GoogleMap />
      <Navbar />
      {isModalOpen && <FormModal title='Example Name' closeModal={closeModal} />}
      {/* Temporary div/button for modal display */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <div
          className='rounded-full border-2 h-12 w-auto p-2 border-black flex justify-center items-center bg-slate-300 cursor-pointer z-10 relative'
          onClick={openModal}
        >
          MODAL
        </div>
      </div>
    </div>
  );
}

export default App;
