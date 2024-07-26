"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CachedIcon from "@mui/icons-material/Cached";
import styles from "./beforeAfterSlider.module.css";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(60);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  const beforeImages = ["before1.svg", "before2.svg", "before3.svg", "before4.svg", "before5.svg", "before6.svg"];
  const afterImages = ["after1.svg", "after2.svg", "after3.svg", "after4.svg", "after5.svg", "after6.svg"];

  const getRandomImage = (lastIndex) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 6);
    } while (newIndex === lastIndex);
    return newIndex;
  };

  const [currentBefore, setCurrentBefore] = useState(beforeImages[getRandomImage(-1)]);
  const [currentAfter, setCurrentAfter] = useState(afterImages[getRandomImage(-1)]);
  const [lastIndex, setLastIndex] = useState(-1);

  const handleReload = () => {
    const newIndex = getRandomImage(lastIndex);
    setCurrentBefore(beforeImages[newIndex]);
    setCurrentAfter(afterImages[newIndex]);
    setLastIndex(newIndex);
    setSliderPosition(60); // Reset slider position to default
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

      buttonX = Math.max(0, buttonX);
      buttonX = Math.min(sliderParentRect.width - buttonWidth, buttonX);
      const sliderPercent = (buttonX / (sliderParentRect.width - buttonWidth)) * 100;

      setSliderPosition(sliderPercent);
    };

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    button.addEventListener("touchstart", handleStart, { passive: false });
    button.addEventListener("touchend", handleEnd, { passive: false });
    button.addEventListener("touchmove", handleMoveButton, { passive: false });

    return () => {
      button.removeEventListener("touchstart", handleStart);
      button.removeEventListener("touchend", handleEnd);
      button.removeEventListener("touchmove", handleMoveButton);
    };
  }, [isDragging]);

  return (
    <div className="w-full min-w-[375px] h-screen flex flex-col items-center justify-start mt-1 bg-white scroll-smooth ">
      <div className="w-[90%] flex justify-between bg-white">
        <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2" />
        <img src="24hr.svg" alt="24 hour" className="mr-2" />
      </div>

      {/* Slider Parent */}
      <div className="w-full h-full flex flex-col items-center justify-start bg-[url('/audio-app/ipad.svg')] bg-cover bg-right pr-4 ">
        <div
          className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl"
          style={{ transform: "rotate(-1deg)" }}
          ref={sliderRef}
        >
          <div className="w-[75%] h-[85%] min-w-[290px] bg-white-500 ml-14 mt-8 rounded-xl" style={{ transform: "rotate(1deg)" }}>
            {/* Wrapper around the images */}
            <div
              className="w-full h-full relative overflow-hidden select-none"
              style={{ cursor: isDragging ? "ew-resize" : "default" }}
            >
              <Image src={currentAfter} alt="After" fill priority />
              <div
                className="w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image src={currentBefore} alt="Before" fill priority />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-full my-auto rotate-1">
            <div className="flex w-auto items-center justify-center rotate-1 mr-6">
              <CachedIcon color="disabled" fontSize="large" alt="Reload" className="cursor-pointer" onClick={handleReload} />
            </div>

            <div
              className={`h-[60%] w-[53%] flex items-center justify-center rounded-full mt-2 border-zinc-900 bg-gradient-to-b from-gray-300 to-gray-50 rotate-1 mx-6 ${styles["button-pseudo-element"]}`}
              ref={buttonRef}
              style={{ "--slider-position": `${sliderPosition}%` }}
            >
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
