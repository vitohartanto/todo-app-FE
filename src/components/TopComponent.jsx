import React from 'react';
import BackgroundImageDark from '../images/bg-mobile-dark.jpg';
import BackgroundImageLight from '../images/bg-mobile-light.jpg';
import Sun from '../images/icon-sun.svg';
import Moon from '../images/icon-moon.svg';
import { FaMoon } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

const TopComponent = ({
  isDarkMode,
  toggleDarkMode,
  onLogout,
  isAuthenticated,
}) => {
  return (
    <div className="flex justify-center">
      {isAuthenticated && (
        <img
          src={isDarkMode ? BackgroundImageDark : BackgroundImageLight}
          alt="Background Mobile"
          className="w-full absolute inset-0 z-[-1]"
        />
      )}
      <div className="flex justify-between items-center px-0 py-8 w-[327px] sm:w-96 sm:pt-12 lg:w-[600px] lg:pt-16">
        <h1
          className={`${
            isAuthenticated
              ? 'text-white'
              : isDarkMode
              ? 'text-white'
              : 'text-[#484b6a]'
          } text-xl font-semibold tracking-widest`}
        >
          T O D O
        </h1>
        {isDarkMode ? (
          <img
            src={Sun}
            alt="Sun Icon"
            className="w-6 h-6"
            onClick={() => {
              toggleDarkMode();
            }}
          />
        ) : (
          <FaMoon
            style={{ color: '#484b6a', fontSize: '20px' }}
            onClick={() => {
              toggleDarkMode();
            }}
          />
        )}

        {isAuthenticated && (
          <button
            className="flex items-center p-2 border-2 border-white rounded-lg gap-x-4"
            onClick={onLogout}
          >
            <p className="text-lg text-white">Vito</p>
            <FaSignOutAlt style={{ color: '#ffffff' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopComponent;
