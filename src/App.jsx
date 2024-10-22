import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import TodoApp from './pages/TodoApp';
import Register from './pages/Register';
import Login from './pages/Login';
import toast, { Toaster } from 'react-hot-toast';

const devURL = 'http://localhost:5000';
const prodURL = 'https://todo-app-be-xi.vercel.app';

// Fungsi untuk memilih URL berdasarkan mode environment
const getBaseURL = () => {
  return import.meta.env.MODE === 'development' ? devURL : prodURL;
};

function App() {
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(null); // Menyimpan ID todo yang sedang diedit
  const [isDarkMode, setIsDarkMode] = useState(true); // State untuk mode
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk toggle mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${getBaseURL()}/authentications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        // Simpan token ke local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsAuthenticated(true);
        // Redirect ke halaman todo-app setelah berhasil login
        navigate('/');
      } else {
        toast.error(data.msg || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during log in');
    }
  };

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await fetch(`${getBaseURL()}/authentications`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Logout successful!');
          // Hapus token dari localStorage
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          toast.error(data.msg || 'Logout failed');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  console.log('Mode ni bos');
  console.log(import.meta.env.MODE);
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/register"
            element={
              <Register
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                setIsAuthenticated={setIsAuthenticated}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <TodoApp
                  isDarkMode={isDarkMode}
                  isAuthenticated={isAuthenticated}
                  toggleDarkMode={toggleDarkMode}
                  description={description}
                  setDescription={setDescription}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  onLogout={handleLogout}
                  username={username}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
