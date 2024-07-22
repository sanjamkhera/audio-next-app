"use client"
import React from 'react';

const FeatureListLarge = () => {

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
    <div className="w-[95%] h-full flex flex-col max-w-[1440px]">
      <div className="w-[50%] h-2/3 font-bold text-[22px] flex flex-col justify-start text-white mt-16 sl:mt-12 al:mt-12">
        <div className="pt-[22px] pb-[26px] whitespace-nowrap">
          <span className="text-[22px] leading-[1.2] ">*24 hour delivery</span>
          <span className="text-white text-opacity-60 leading-[1.2] text-[22px] xs:text-[18px]">(usually less), or money back guaranteed</span>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />
        <div className="pt-[22px] pb-[26px] whitespace-nowrap">
          <span className="text-[22px] leading-[1.2] ">3-5 high-fidelity screens</span>
          <span className="text-white text-opacity-60 leading-[1.2] text-[22px]">(max), plus 1 round of revisions</span>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />
        <div className="pt-[22px] pb-[26px] whitespace-nowrap">
          <span className="text-[22px] leading-[1.2] ">100% confidentiality -</span>
          <span className="text-white text-opacity-60 leading-[1.2] text-[22px]">NDA included as part of the contract</span>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />
        <div className="pt-[22px] pb-[26px] whitespace-nowrap">
          <div className="text-white text-opacity-60 leading-[1.2] text-[22px] pt-[2px]">
            <span className="text-[22px] text-white text-opacity-60 leading-[1.2] ">Interactive,</span>
            <span className="text-white leading-[1.2] text-[22px]">clickable Figma prototypes</span>  + artboard access
          </div>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />
        <div className="pt-[22px] pb-[26px] whitespace-nowrap">
          <span className="text-[22px] leading-[1.2] ">Full-rights</span>
          <span className="text-white text-opacity-60 leading-[1.2] text-[22px]">to all digital designs, fonts and assets</span>
        </div>
        <hr className="border-t border-white border-opacity-25 w-full" />
        <div className="font-medium py-[18px] whitespace-nowrap">
          <span className="italic text-[15px] leading-[1.5] ">Coming soon:</span>
          <span className="text-white text-opacity-45 leading-[1.2] text-[15px]">Code export, animations, project history, client dashboard, downloads & more</span>
        </div>
      </div>

      <div className="w-[70%] h-1/3 flex flex-col justify-start items-start gap-6 mx-auto pt-8">
        <button 
          onClick={handleShareOnLinkedIn}
          className="w-full h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur gap-2 whitespace-nowrap"
        >
          Share on 
          <img src="linkedIn.svg" alt="Button Grid" className="w-auto h-auto" />
        </button>
        <button 
          onClick={handleSaveToHomeScreen}
          className="w-full h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur gap-2 whitespace-nowrap"
        >
          <img src="buttonGrid.svg" alt="Button Grid" className="w-auto h-auto" />
          Save to home screen
        </button>
      </div>
    </div>
  );
};

export default FeatureListLarge;
