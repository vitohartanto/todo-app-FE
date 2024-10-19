import React from 'react';
import BackgroundImageDark from '../images/bg-mobile-dark.jpg';
import BackgroundImageLight from '../images/bg-mobile-light.jpg';
import Sun from '../images/icon-sun.svg';
import Moon from '../images/icon-moon.svg';
const TopComponent = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex justify-center">
      <img
        src={isDarkMode ? BackgroundImageDark : BackgroundImageLight}
        alt="Background Mobile"
        className="w-full absolute inset-0 z-[-1]"
      />
      <div className="flex justify-between px-0 py-8 w-[327px] sm:w-96 sm:pt-12 lg:w-[600px] lg:pt-16">
        <h1 className="text-xl font-semibold tracking-widest text-white">
          T O D O
        </h1>
        <img
          src={isDarkMode ? Sun : Moon}
          alt="Sun or Moon Icon"
          className="w-6 h-6"
          onClick={toggleDarkMode}
        />
      </div>
    </div>
  );
};

export default TopComponent;
