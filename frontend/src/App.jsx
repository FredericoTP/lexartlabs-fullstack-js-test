import { Routes, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
