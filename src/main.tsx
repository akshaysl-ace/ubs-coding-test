import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowDetails from './ShowDetails';
import NotFound from './NotFound';
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<App />} />
          <Route path='/details/:id' element={<ShowDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);