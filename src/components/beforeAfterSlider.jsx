"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CachedIcon from '@mui/icons-material/Cached';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  const beforeImages = ['before1.svg', 'before2.svg', 'before3.svg', 'before4.svg', 'before5.svg', 'before6.svg'];
  const afterImages = ['after1.svg', 'after2.svg', 'after3.svg', 'after4.svg', 'after5.svg', 'after6.svg'];

  const getRandomImage = () => Math.floor(Math.random() * 6);

  const randomIndex = getRandomImage();
  const [currentBefore, setCurrentBefore] = useState(beforeImages[randomIndex]);
  const [currentAfter, setCurrentAfter] = useState(afterImages[randomIndex]);

  const handleReload = () => {
    const newIndex = getRandomImage();
    setCurrentBefore(beforeImages[newIndex]);
    setCurrentAfter(afterImages[newIndex]);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const button = buttonRef.current;

    const handleMoveButton = (event) => {
      if (!isDragging) return;
      const sliderParentRect = slider.parentElement.getBoundingClientRect();
      const buttonWidth = button.getBoundingClientRect().width;
    
      event.preventDefault();
      const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
    
      // Calculate button's new X position relative to the slider, centered on the touch point
      let buttonX = clientX - sliderParentRect.left - (buttonWidth / 2);
    
      // Constrain the button's position to the slider's bounds
      buttonX = Math.max(0, buttonX); // Prevent moving beyond the left edge
      buttonX = Math.min(sliderParentRect.width - buttonWidth, buttonX); // Prevent moving beyond the right edge
    
      // Calculate the new slider position as a percentage
      const sliderPercent = (buttonX / (sliderParentRect.width - buttonWidth)) * 100;
    
      setSliderPosition(sliderPercent);
    };

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    button.addEventListener('touchstart', handleStart, { passive: false });
    button.addEventListener('touchend', handleEnd, { passive: false });
    button.addEventListener('touchmove', handleMoveButton, { passive: false });

    return () => {
      button.removeEventListener('touchstart', handleStart);
      button.removeEventListener('touchend', handleEnd);
      button.removeEventListener('touchmove', handleMoveButton);
    };
  }, [isDragging]);

  return (
    <div className='w-full h-full flex flex-col items-center justify-start mt-1 bg-white'>

      <div className="w-[90%] flex justify-between bg-white">
        <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2" />
        <img src="24hr.svg" alt="24 hour" className="mr-2" />
      </div>

      {/* Slider Parent */}
      <div className="w-full h-full flex flex-col items-center justify-start bg-[url('/audio-to-UI-app/ipad.svg')] bg-cover bg-right" style={{ backgroundPosition: 'calc(100% + 15px) center' }}>
        <div className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl" style={{ transform: 'rotate(-1deg)' }} ref={sliderRef}>
          <div className='w-[75%] h-[85%] min-w-[290px] bg-white-500 ml-14 mt-8 rounded-xl' style={{ transform: 'rotate(1deg)' }}>

            {/* Wrapper around the images */}
            <div className="w-full h-full relative overflow-hidden select-none" style={{ cursor: isDragging ? 'ew-resize' : 'default' }}>
              <Image src={currentAfter} alt="After" fill priority />
              <div className='w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none' style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <Image src={currentBefore} alt="Before" fill priority />
              </div>
            </div>

          </div>
          <div className="flex flex-row items-center justify-end w-full bg-[#efefef] my-auto rotate-1">

            <div className="flex w-auto items-center justify-center rotate-1 mr-2">
              <CachedIcon color="disabled" fontSize="large" alt="Reload" className="cursor-pointer" onClick={handleReload} />
            </div>

            <div className="h-[60%] w-[55%] flex items-center justify-center rounded-full mt-2 border-zinc-500 bg-gradient-to-b from-gray-300 to-white rotate-1 ml-4 pl-6 mr-8" ref={buttonRef}>
              <button className='absolute cursor-pointer -mt-3 -mb-3 -rotate-1' style={{ left: `calc(${sliderPosition}% - 49px)` }}>
                <img src="slider.svg" alt="Slider" className="cursor-pointer ml-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
