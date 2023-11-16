import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App';
import ForumMain from "./Forum/ForumMain.js"
import './index.css'

export default function AppUrls(){
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/forum' element={<ForumMain/>}/>
        </Routes>
      </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppUrls/>
  </React.StrictMode>
);
