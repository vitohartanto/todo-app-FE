import React from 'react';
import TopComponent from '../components/TopComponent';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const devURL = 'http://localhost:5000';
const prodURL = 'https://todo-app-be-xi.vercel.app';

// Fungsi untuk memilih URL berdasarkan mode environment
const getBaseURL = () => {
  return import.meta.env.MODE === 'development' ? devURL : prodURL;
};

const Login = ({ isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getBaseURL()}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token ke local storage
        localStorage.setItem('token', data.token);
        // Redirect ke halaman dashboard atau halaman lain setelah berhasil login
        navigate('/dashboard');
      } else {
        toast('Login failed');
      }
    } catch (error) {
      toast('An error occurred during registration');
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <TopComponent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`absolute inset-0 z-[-1] h-full w-full ${
          isDarkMode ? 'bg-[#161722]' : 'bg-[#e4e5f1]'
        }`}
      />
      <form
        onClick={handleLogin}
        className={`mt-12  h-[350px] ${
          isDarkMode ? 'bg-[#25273c]' : 'bg-[#fafafa]'
        } w-[327px] flex flex-col rounded-lg items-center justify-center`}
      >
        <h1
          className={`text-2xl ${
            isDarkMode ? 'text-white' : 'text-black'
          } mb-4`}
        >
          Login
        </h1>
        <p
          className={` text-lg ${
            isDarkMode ? 'text-white' : 'text-black'
          } mb-4`}
        >
          Plan It, Do It, Live It!
        </p>
        <div className="flex flex-col gap-y-4">
          <input
            type="text"
            className="px-4 py-2 rounded-lg border-[#e4e5f1] border-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 rounded-lg border-[#e4e5f1] border-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 ${
              isDarkMode
                ? 'bg-[#161722] text-white'
                : 'bg-[#e4e5f1] text-[#161722]'
            }`}
          >
            Login
          </button>
        </div>
        <p
          className={`mt-4 text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          Don&apos;t have an account yet?{' '}
          <Link
            to="/register"
            className={`underline ${
              isDarkMode ? 'text-[#e4e5f1]' : 'text-[#161722]'
            }`}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
