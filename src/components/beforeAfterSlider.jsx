"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CachedIcon from "@mui/icons-material/Cached";
import styles from "./beforeAfterSlider.module.css";

// Component for displaying a loading spinner overlay
const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl z-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
  </div>
);

const BeforeAfterSlider = () => {
  // State variables
  const [sliderPosition, setSliderPosition] = useState(60); // Position of the slider (0-100)
  const [isDragging, setIsDragging] = useState(false); // Whether the user is currently dragging the slider
  const [isLoading, setIsLoading] = useState(true); // Whether images are currently loading
  const [currentBefore, setCurrentBefore] = useState(""); // Current 'before' image
  const [currentAfter, setCurrentAfter] = useState(""); // Current 'after' image
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // Whether images have been loaded at least once

  // Refs for DOM elements
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  // Arrays of image file names
  const beforeImages = ["before1.svg", "before2.svg", "before3.svg", "before4.svg", "before5.svg", "before6.svg"];
  const afterImages = ["after1.svg", "after2.svg", "after3.svg", "after4.svg", "after5.svg", "after6.svg"];

  // Function to get a random image index, different from the last one
  const getRandomImage = (lastIndex) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 6);
    } while (newIndex === lastIndex);
    return newIndex;
  };

  // Function to load new images
  const loadImages = (index) => {
    setIsLoading(true);
    setCurrentBefore(beforeImages[index]);
    setCurrentAfter(afterImages[index]);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      if (!hasLoadedOnce) {
        setHasLoadedOnce(true);
      }
    }, 500);
  };

  // Load initial images on component mount
  useEffect(() => {
    const initialIndex = getRandomImage(-1);
    loadImages(initialIndex);
  }, []);

  // Function to reload images when the refresh button is clicked
  const handleReload = () => {
    const newIndex = getRandomImage(beforeImages.indexOf(currentBefore));
    loadImages(newIndex);
    setSliderPosition(60);
  };

  // Effect to handle slider dragging
  useEffect(() => {
    const slider = sliderRef.current;
    const button = buttonRef.current;

    const handleMoveButton = (event) => {
      if (!isDragging) return;
      const sliderParentRect = slider.parentElement.getBoundingClientRect();
      const buttonWidth = button.getBoundingClientRect().width;

      event.preventDefault();
      const clientX = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
      let buttonX = clientX - sliderParentRect.left - buttonWidth / 2;

      // Constrain button position within the slider
      buttonX = Math.max(0, buttonX);
      buttonX = Math.min(sliderParentRect.width - buttonWidth, buttonX);
      const sliderPercent = (buttonX / (sliderParentRect.width - buttonWidth)) * 100;

      setSliderPosition(sliderPercent);
    };

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    // Add event listeners for touch events
    button.addEventListener("touchstart", handleStart, { passive: false });
    button.addEventListener("touchend", handleEnd, { passive: false });
    button.addEventListener("touchmove", handleMoveButton, { passive: false });

    // Clean up event listeners on component unmount
    return () => {
      button.removeEventListener("touchstart", handleStart);
      button.removeEventListener("touchend", handleEnd);
      button.removeEventListener("touchmove", handleMoveButton);
    };
  }, [isDragging]);

  return (
    <div className="w-full min-w-[375px] h-screen flex flex-col items-center justify-start mt-1 bg-white scroll-smooth">
      {/* Header with logo images */}
      <div className="w-[90%] flex justify-between bg-white">
        <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2"/>
        <img src="24hr.svg" alt="24 hour" className="mr-2"/>
      </div>

      {/* Main content area with iPad background */}
      <div className="w-full flex-grow flex flex-col items-center justify-start bg-[url('/ipad.svg')] bg-cover bg-right bg-no-repeat pr-4" style={{ height: 'calc(100vh - var(--top-div-height))' }}>
        {/* Slider container */}
        <div
          className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl"
          style={{ transform: "rotate(-1deg)" }}
          ref={sliderRef}
        >
          {/* Image container */}
          <div className="w-[75%] h-[85%] min-w-[290px] bg-white-500 ml-14 mt-8 rounded-xl relative" style={{ transform: "rotate(1deg)" }}>
            {(!hasLoadedOnce || isLoading) && <LoadingOverlay />}
            <div
              className="w-full h-full relative overflow-hidden select-none"
              style={{ cursor: isDragging ? "ew-resize" : "default" }}
            >
              {/* 'After' image */}
              {currentAfter && <Image src={currentAfter} alt="After" fill priority />}
              {/* 'Before' image with clip path for slider effect */}
              <div
                className="w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                {currentBefore && <Image src={currentBefore} alt="Before" fill priority />}
              </div>
            </div>
          </div>
          {/* Slider controls */}
          <div className="flex flex-row items-center justify-end w-full my-auto rotate-1">
            {/* Reload button */}
            <div className="flex w-auto items-center justify-center rotate-1 mr-6">
              <CachedIcon color="disabled" fontSize="large" alt="Reload" className="cursor-pointer" onClick={handleReload} />
            </div>

            {/* Slider bar */}
            <div
              className={`h-[60%] w-[53%] flex items-center justify-center rounded-full mt-2 border-zinc-900 bg-gradient-to-b from-gray-300 to-gray-50 rotate-1 mx-6 ${styles["button-pseudo-element"]}`}
              ref={buttonRef}
              style={{ "--slider-position": `${sliderPosition}%` }}
            >
              {/* Slider button */}
              <button className="absolute cursor-pointer -mt-3 -mb-3 -rotate-1" style={{ left: `calc(${sliderPosition}% - 49px)` }}>
                <img src="slider.svg" alt="Slider" className="cursor-pointer ml-5 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
