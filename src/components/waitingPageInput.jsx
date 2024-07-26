"use client"

import React from 'react';

const WaitingPageInput = ({ onStartNewProject }) => {
  const handleStartNewProject = () => {
    // Reset all states to initial values
    if (onStartNewProject) onStartNewProject();
  };

  const handleShareOnLinkedIn = () => {
    // Share on LinkedIn
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleSaveToHomeScreen = () => {
    // Prompt the user to save the page to their home screen
    if (window.navigator.standalone === false) {
      alert('To save this app to your home screen, tap the share button and then "Add to Home Screen".');
    } else if (window.navigator.standalone === undefined && window.matchMedia('(display-mode: browser)').matches) {
      alert('To save this app to your home screen, tap the menu button and then "Install App" or "Add to Home Screen".');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 pt-8 pb-7 sl:pt-5 al:pt-5 mx:pt-10">
      <button 
        onClick={handleStartNewProject}
        className="sl:w-[90%] al:w-[90%] mx:w-[90%] w-[75%] h-[52px] bg-white text-[#14151A] font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center gap-2 ring-2 ring-inset ring-gray-300 cursor-pointer whitespace-nowrap"
      >
        <img src="yellowPlusImg.svg" alt="Button Grid" className="w-auto h-auto" />
        Start a new project
      </button>
      <button 
        onClick={handleShareOnLinkedIn}
        className="sl:w-[90%] al:w-[90%] mx:w-[90%] w-[75%] h-[52px] bg-white text-[#14151A] font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center gap-2 ring-2 ring-inset ring-gray-300 cursor-pointer whitespace-nowrap"
      >
        Share on 
        <img src="linkedInBlue.svg" alt="Button Grid" className="w-auto h-auto" />
      </button>
      <button 
        onClick={handleSaveToHomeScreen}
        className="sl:w-[90%] al:w-[90%] mx:w-[90%] w-[75%] h-[52px] bg-white text-[#14151A] font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center gap-2 ring-2 ring-inset ring-gray-300 cursor-pointer whitespace-nowrap"
      >
        <img src="buttonGridPurple.svg" alt="Button Grid" className="w-auto h-auto" />
        Save to home screen
      </button>
    </div>
  );
};

export default WaitingPageInput;
