"use client"
import React from 'react';

const FeatureButtons = () => {

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

  const handleStartNewProject = () => {
    // Reset all states to initial values
    if (onStartNewProject) onStartNewProject();
  };

  return (
    <div className="w-full h-full items-center justify-start bg-cover bg-[url('/audio-to-UI-app/background.svg')] bg-black">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 pb-8">
        <button 
          onClick={handleShareOnLinkedIn}
          className="w-[90%] h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur gap-2 whitespace-nowrap"
        >
          Share on <img src="linkedIn.svg" alt="Button Grid" className="w-auto h-auto" />
        </button>
        <button 
          onClick={handleSaveToHomeScreen}
          className="w-[90%] h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur gap-2 whitespace-nowrap"
        >
          <img src="buttonGrid.svg" alt="Button Grid" className="w-auto h-auto" />
          Save to home screen
        </button>
      </div>
    </div>
  );
};

export default FeatureButtons;
