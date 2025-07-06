import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowDetails from './ShowDetails';
import NotFound from './NotFound';
import { MoviesProvider } from './moviesContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MoviesProvider>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<App />} />
        <Route path='/details/:id' element={<ShowDetails />} />
      </Routes>
    </MoviesProvider>
  </BrowserRouter>,
);
