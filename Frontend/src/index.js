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
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import PageNotFound from './ErrorPage/PageNotFound.jsx';
import VerifiactionPage from './VerificationPage/VerifiactionPage.jsx';
import AdminDashboard from './AdminDashboard/AdminDashboard.js';
import { ThemeProvider } from './ThemeSwitcher/ThemeContext.js';

export default function AppUrls() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/forum' element={<ForumMain />} />
        <Route path='/forum/:id' element={<SubForum />} />
        <Route path='/userVerification/:id' element={<VerifiactionPage />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
const googleApiKey = process.env.REACT_APP_API_KEY;
const googleOauthKey = process.env.REACT_APP_GOOGLE_OAUTH_KEY;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleOauthKey}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Provider store={store}>
          <APIProvider apiKey={googleApiKey} libraries={['places']}>
            <ThemeProvider>
              <AppUrls />
            </ThemeProvider>
          </APIProvider>
        </Provider>
      </CookiesProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
