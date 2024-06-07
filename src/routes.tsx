import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login';
import { Home } from './pages/home';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
