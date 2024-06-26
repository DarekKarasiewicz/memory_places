import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';

import ForumMainPage from 'Pages/Forum/ForumMainPage';
import PageNotFound from './Components/ErrorPage/PageNotFound.jsx';
import VerifiactionPage from './Components/VerificationPage/VerifiactionPage.jsx';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard.js';
import AdminPlaceAction from './Pages/AdminDashboard/AdminPlaceAction.js';
import AdminTrailAction from 'Pages/AdminDashboard/AdminTrailAction.js';
import MemoryPlaces from 'Pages/MemoryPlaces/MemoryPlaces.js';
import PasswordResetPage from 'Components/PasswordResetPage/PasswordResetPage.js';

import { ThemeProvider } from './Components/ThemeSwitcher/ThemeContext.js';
import { FontSizeProvider } from 'Components/FontSizeSwitcher/FontSizeContext.js';
import './index.css';

function ProtectedRoute({ role, roles, element }) {
  return !roles.length || roles.includes(role) ? element : <Navigate to='/*' replace />;
}

export default function AppUrls() {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const role = user && (user.admin ? 'admin' : user.master ? 'master' : 'user');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MemoryPlaces />} />
        <Route path='/forum' element={<ForumMainPage />} />
        <Route path='/forum/:placeid' element={<ForumMainPage />} />
        <Route path='/forum/:placeid/:postid' element={<ForumMainPage />} />
        <Route path='/userVerification/:id' element={<VerifiactionPage />} />
        <Route path='/userPasswordReset/:id' element={<PasswordResetPage />} />
        <Route
          path='/adminDashboard'
          element={
            <ProtectedRoute
              path='/adminDashboard'
              role={role}
              roles={['admin', 'master']}
              element={<AdminDashboard />}
            />
          }
        />
        <Route
          path='/adminDashboard/placeAdd'
          element={
            <ProtectedRoute
              path='/adminDashboard/placeAdd'
              role={role}
              roles={['admin', 'master']}
              element={<AdminPlaceAction />}
            />
          }
        />
        <Route
          path='/adminDashboard/placeEdit/:id'
          element={
            <ProtectedRoute
              path='/adminDashboard/placeEdit/:id'
              role={role}
              roles={['admin', 'master']}
              element={<AdminPlaceAction action='edit' />}
            />
          }
        />
        <Route
          path='/adminDashboard/placeView/:id'
          element={
            <ProtectedRoute
              path='/adminDashboard/placeView/:id'
              role={role}
              roles={['admin', 'master']}
              element={<AdminPlaceAction action='view' />}
            />
          }
        />
        <Route
          path='/adminDashboard/trailAdd'
          element={
            <ProtectedRoute
              path='/adminDashboard/trailAdd'
              role={role}
              roles={['admin', 'master']}
              element={<AdminTrailAction />}
            />
          }
        />
        <Route
          path='/adminDashboard/trailEdit/:id'
          element={
            <ProtectedRoute
              path='/adminDashboard/trailEdit/:id'
              role={role}
              roles={['admin', 'master']}
              element={<AdminTrailAction action='edit' />}
            />
          }
        />
        <Route
          path='/adminDashboard/trailView/:id'
          element={
            <ProtectedRoute
              path='/adminDashboard/trailView/:id'
              role={role}
              roles={['admin', 'master']}
              element={<AdminTrailAction action='view' />}
            />
          }
        />
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
              <FontSizeProvider>
                <AppUrls />
              </FontSizeProvider>
            </ThemeProvider>
          </APIProvider>
        </Provider>
      </CookiesProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
