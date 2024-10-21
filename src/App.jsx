import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import TodoApp from './pages/TodoApp';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(null); // Menyimpan ID todo yang sedang diedit
  const [isDarkMode, setIsDarkMode] = useState(true); // State untuk mode
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fungsi untuk toggle mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogin = (token) => {
    // Simpan token di localStorage
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
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
                  onLogin={handleLogin}
                  toggleDarkMode={toggleDarkMode}
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
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
