import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import MainProvider from './context/MainProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <LoginProvider>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainProvider>
    </LoginProvider>
  );
}

export default App;
