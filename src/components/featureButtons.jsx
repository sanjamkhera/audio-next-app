"use client"
import React, { useState, useEffect } from 'react';


// FeatureButtons component definition
const FeatureButtons = () => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/background.svg';
    img.onload = () => setIsImageLoaded(true);
  }, []);

  // Function to handle sharing on LinkedIn
  const handleShareOnLinkedIn = () => {
    // Construct the LinkedIn sharing URL
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    // Open the LinkedIn sharing URL in a new tab
    window.open(linkedInUrl, '_blank');
  };

  // Function to handle saving to home screen
  const handleSaveToHomeScreen = () => {
    // Check if the app is already installed (iOS)
    if (window.navigator.standalone === false) {
      alert('To save this app to your home screen, tap the share button and then "Add to Home Screen".');
    } 
    // Check if the app is not installed and running in a browser
    else if (window.navigator.standalone === undefined && window.matchMedia('(display-mode: browser)').matches) {
      alert('To save this app to your home screen, tap the menu button and then "Install App" or "Add to Home Screen".');
    }
  };

  // Function to handle starting a new project
  const handleStartNewProject = () => {
    // Reset all states to initial values
    // Note: onStartNewProject is not defined in this component
    if (onStartNewProject) onStartNewProject();
  };

  return (
    // Main container with background image
    <div className="w-full h-full items-center justify-start bg-black" style={{
      backgroundImage: `url('/background.svg')`,
      backgroundSize: 'cover',
    }}>
      {/* Inner container for buttons */}
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 pb-8">
        {/* LinkedIn share button */}
        <button 
          onClick={handleShareOnLinkedIn}
          className="w-[90%] h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur gap-2 whitespace-nowrap"
        >
          Share on <img src="linkedIn.svg" alt="Button Grid" className="w-auto h-auto" />
        </button>
        {/* Save to home screen button */}
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