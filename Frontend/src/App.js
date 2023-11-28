import React from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import Navbar from './Navbar/Navbar';

function App() {
  return (
    <div className='w-screen h-screen relative'>
      <GoogleMap />
      <Navbar />
    </div>
  );
}

export default App;
