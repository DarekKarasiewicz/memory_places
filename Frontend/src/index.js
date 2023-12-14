import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import { APIProvider } from '@vis.gl/react-google-maps';
import App from './App';
import ForumMain from './Forum/ForumMain.js';
import './index.css';
import SubForum from './Forum/SubForum.jsx';

export default function AppUrls() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/forum' element={<ForumMain />} />
        <Route path='/forum/:id' element={<SubForum />} />
      </Routes>
    </BrowserRouter>
  );
}
const googleApiKey = process.env.REACT_APP_API_KEY;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <APIProvider apiKey={googleApiKey} libraries={['places']}>
        <AppUrls />
      </APIProvider>
    </Provider>
  </React.StrictMode>,
);
