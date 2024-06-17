import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
