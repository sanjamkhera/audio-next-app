"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./beforeAfterSlider.module.css";

// Component for displaying a loading spinner overlay
const LoadingOverlay = ({ widthClass, heightClass }) => (
  <div className={`absolute bg-black bg-opacity-50 flex items-center justify-center z-10 ${widthClass} ${heightClass}`}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
  </div>
);

const BeforeAfterSlider = () => {
  // State variables
  const [sliderPosition, setSliderPosition] = useState(70); // Position of the slider (0-100)
  const [isDragging, setIsDragging] = useState(false); // Whether the user is currently dragging the slider
  const [isLoading, setIsLoading] = useState(true); // Whether images are currently loading
  const [currentBefore, setCurrentBefore] = useState(""); // Current 'before' image
  const [currentAfter, setCurrentAfter] = useState(""); // Current 'after' image
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // Whether images have been loaded at least once

  // Refs for DOM elements
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  // Arrays of image file names
  const beforeImages = ["before1.svg", "before2.svg", "before3.svg", "before4.svg", "before5.svg", "before6.svg", "before7.svg", "before8.svg", "before9.svg", "before10.svg"];
  const afterImages = ["after1.svg", "after2.svg", "after3.svg", "after4.svg", "after5.svg", "after6.svg", "after7.svg", "after8.svg", "after9.svg", "after10.svg"];

  // Function to get a random image index, different from the last one
  const getRandomImage = (lastIndex) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 10);
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
      buttonX = Math.max(0, Math.min(sliderParentRect.width - buttonWidth, buttonX));

      const currentPercent = sliderPosition;
      const rawPercent = (buttonX / (sliderParentRect.width - buttonWidth)) * 100;

      const sensitivity = 0.09; // Adjust this value to change sensitivity (lower = less sensitive)
      const newPercent = currentPercent + (rawPercent - currentPercent) * sensitivity;

      // Ensure the slider position stays within 0-100 range
      setSliderPosition(Math.max(0, Math.min(100, newPercent)));
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
  }, [isDragging, sliderPosition]);


  return (
    <div className="w-full min-w-[375px] flex flex-col items-center justify-between bg-white mt-1">

      {/* Header with logo images */}
      <div className="w-[80%] mt-1 h-10 flex justify-between items-center bg-white">
        <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2" />
        <img src="24hr.svg" alt="24 hour" className="mr-2" />
      </div>

      <div className="w-[99%] h-[85vh] flex justify-center items-center bg-[url('/ipad.svg')] bg-contain bg-no-repeat bg-center">
        {/* Main content area with iPad background */}
        <div className="flex w-[98%] h-[98%] justify-center items-center" ref={sliderRef}>
          {/* Image container */}
          <div className="w-full h-[95%] flex justify-center items-center min-w-[290px] relative">
            {(!hasLoadedOnce || isLoading) && (
              <LoadingOverlay
                widthClass="w-[82%] left-1/2 -translate-x-1/2"
                heightClass="h-full"
              />
            )}
            <div className="w-full h-full relative overflow-hidden select-none" style={{ cursor: isDragging ? "ew-resize" : "default" }}>
              {/* 'After' image */}
              {currentAfter && <Image src={currentAfter} alt="After" fill priority />}
              {/* 'Before' image with clip path for slider effect */}
              <div className="w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                {currentBefore && <Image src={currentBefore} alt="Before" fill priority />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="flex flex-row items-center justify-between w-[90%] h-[10vh]">

        {/* Reload button */}
        <div className="mx-4">
          <img src="reload.svg" alt="Reload" className="cursor-pointer" onClick={handleReload} />
        </div>

        {/* Slider bar */}
        <div
          className={`h-[25%] w-[65%] flex rounded-full border-zinc-900 bg-gradient-to-b from-gray-300 to-gray-50 mr-6 -z-1 mt-1 ${styles["button-pseudo-element"]}`}
          ref={buttonRef}
          style={{ "--slider-position": `${sliderPosition}%` }}
        >
          {/* Slider button */}
          <button
            className="absolute cursor-pointer -mt-3 -mb-3"
            style={{
              left: `max(-49px, calc(${sliderPosition}% - 49px))`,
            }}
          >
            <img src="slider.svg" alt="Slider" className="cursor-pointer ml-6" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;


