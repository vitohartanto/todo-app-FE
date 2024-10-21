import React from 'react';
import TopComponent from '../components/TopComponent';
import { Link } from 'react-router-dom';

const Register = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex flex-col items-center ">
      <TopComponent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`absolute inset-0 z-[-1] h-full w-full ${
          isDarkMode ? 'bg-[#161722]' : 'bg-[#e4e5f1]'
        }`}
      />
      <form
        className={`mt-12  h-[350px] ${
          isDarkMode ? 'bg-[#25273c]' : 'bg-[#fafafa]'
        } w-[327px] flex flex-col rounded-lg items-center justify-center`}
      >
        <h1
          className={`text-2xl ${
            isDarkMode ? 'text-white' : 'text-black'
          } mb-4`}
        >
          Register
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
          />
          <input
            type="text"
            className="px-4 py-2 rounded-lg border-[#e4e5f1] border-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 ${
              isDarkMode
                ? 'bg-[#161722] text-white'
                : 'bg-[#e4e5f1] text-[#161722]'
            }`}
          >
            Register
          </button>
        </div>
        <p
          className={`mt-4 text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className={`underline ${
              isDarkMode ? 'text-[#e4e5f1]' : 'text-[#161722]'
            }`}
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
