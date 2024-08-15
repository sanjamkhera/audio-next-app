"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./beforeAfterSlider.module.css";

// Component for displaying a loading spinner overlay
const LoadingOverlay = ({ widthClass, heightClass }) => (
  <div className={`absolute bg-black bg-opacity-50 flex items-center rounded-2xl justify-center z-10 ${widthClass} ${heightClass}`}>
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
      const sliderRect = slider.getBoundingClientRect();
      const buttonWidth = button.getBoundingClientRect().width;

      event.preventDefault();
      const clientX = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
      let buttonX = clientX - sliderRect.left - buttonWidth / 2;

      // Constrain button position within the slider
      buttonX = Math.max(0, Math.min(sliderRect.width - buttonWidth, buttonX));

      const newPosition = (buttonX / (sliderRect.width - buttonWidth)) * 100;
      setSliderPosition(newPosition);
    };

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    // Add event listeners for both mouse and touch events
    button.addEventListener("mousedown", handleStart);
    document.addEventListener("mousemove", handleMoveButton);
    document.addEventListener("mouseup", handleEnd);
    button.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchmove", handleMoveButton, { passive: false });
    document.addEventListener("touchend", handleEnd);

    // Clean up event listeners on component unmount
    return () => {
      button.removeEventListener("mousedown", handleStart);
      document.removeEventListener("mousemove", handleMoveButton);
      document.removeEventListener("mouseup", handleEnd);
      button.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchmove", handleMoveButton);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);


  return (
    <div className="w-full min-w-[375px] flex flex-col items-center justify-between bg-white mt-1">


        {/* Header with logo images */}
        <div className="w-[80%] mt-1 h-10 flex justify-between items-center bg-white">
          <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2 w-42" />
          <img src="24hr.svg" alt="24 hour" className="mr-2 w-42" />
        </div>

        <div className="w-[99%] h-[85vh] flex justify-center items-center bg-[url('/ipad.svg')] bg-contain bg-no-repeat bg-center relative">
          {/* Main content area with iPad background */}
          <div className="flex w-[98%] h-[98%] justify-center items-center" ref={sliderRef}>
            {/* Image container */}
            <div className="w-full h-[95%] flex justify-center items-center min-w-[290px] relative">
              {(!hasLoadedOnce || isLoading) && (
                <LoadingOverlay
                  widthClass="w-[80%] left-1/2 -translate-x-1/2"
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

          {/* Reload button */}
          <div className="absolute xs:left-10 bottom-3 left-7 z-20">
            <img src="reload.svg" alt="Reload" className="cursor-pointer w-16 xs:w-10 xm:w-12" onClick={handleReload} />
          </div>
        </div>

      {/* Slider controls */}
      <div className="flex flex-row items-center justify-center w-[90%] h-[10vh] mb-1">

        {/* Reload button
        <div className="mx-4">
          <img src="reload.svg" alt="Reload" className="cursor-pointer w-16" onClick={handleReload} />
        </div> */}

        {/* Slider bar */}
        <div
          className={`h-[25%] w-[85%] flex rounded-full border-zinc-900 bg-gradient-to-b from-gray-300 to-gray-50 relative my-1 ${styles["button-pseudo-element"]}`}
          ref={sliderRef}
          style={{ "--slider-position": `${sliderPosition}%` }}
        >
          {/* Slider button */}
          <button
            ref={buttonRef}
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer w-[58px] h-[58px]"
            style={{
              left: `${sliderPosition}%`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <img src="slider.svg" alt="Slider" className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import styles from "./beforeAfterSlider.module.css";

// const LoadingOverlay = ({ widthClass, heightClass }) => (
//   <div className={`absolute bg-black bg-opacity-50 flex items-center rounded-2xl justify-center z-10 ${widthClass} ${heightClass}`}>
//     <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
//   </div>
// );

// const BeforeAfterSlider = () => {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentBefore, setCurrentBefore] = useState("");
//   const [currentAfter, setCurrentAfter] = useState("");
//   const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

//   const sliderRef = useRef(null);
//   const buttonRef = useRef(null);

//   const beforeImages = ["before1.svg", "before2.svg", "before3.svg", "before4.svg", "before5.svg", "before6.svg", "before7.svg", "before8.svg", "before9.svg", "before10.svg"];
//   const afterImages = ["after1.svg", "after2.svg", "after3.svg", "after4.svg", "after5.svg", "after6.svg", "after7.svg", "after8.svg", "after9.svg", "after10.svg"];

//   const getRandomImage = (lastIndex) => {
//     let newIndex;
//     do {
//       newIndex = Math.floor(Math.random() * 10);
//     } while (newIndex === lastIndex);
//     return newIndex;
//   };

//   const loadImages = (index) => {
//     setIsLoading(true);
//     setCurrentBefore(beforeImages[index]);
//     setCurrentAfter(afterImages[index]);

//     setTimeout(() => {
//       setIsLoading(false);
//       if (!hasLoadedOnce) {
//         setHasLoadedOnce(true);
//       }
//     }, 500);
//   };

//   useEffect(() => {
//     const initialIndex = getRandomImage(-1);
//     loadImages(initialIndex);
//   }, []);

//   const handleReload = () => {
//     const newIndex = getRandomImage(beforeImages.indexOf(currentBefore));
//     loadImages(newIndex);
//     setSliderPosition(50);
//   };

//   useEffect(() => {
//     const slider = sliderRef.current;
//     const button = buttonRef.current;

//     const handleMoveSlider = (event) => {
//       if (!isDragging) return;
//       const sliderRect = slider.getBoundingClientRect();
//       const clientX = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
//       let sliderX = clientX - sliderRect.left;

//       sliderX = Math.max(0, Math.min(sliderRect.width, sliderX));

//       const newPosition = (sliderX / sliderRect.width) * 100;
//       setSliderPosition(newPosition);
//     };

//     const handleStart = () => setIsDragging(true);
//     const handleEnd = () => setIsDragging(false);

//     slider.addEventListener("mousedown", handleStart);
//     document.addEventListener("mousemove", handleMoveSlider);
//     document.addEventListener("mouseup", handleEnd);
//     slider.addEventListener("touchstart", handleStart, { passive: false });
//     document.addEventListener("touchmove", handleMoveSlider, { passive: false });
//     document.addEventListener("touchend", handleEnd);

//     return () => {
//       slider.removeEventListener("mousedown", handleStart);
//       document.removeEventListener("mousemove", handleMoveSlider);
//       document.removeEventListener("mouseup", handleEnd);
//       slider.removeEventListener("touchstart", handleStart);
//       document.removeEventListener("touchmove", handleMoveSlider);
//       document.removeEventListener("touchend", handleEnd);
//     };
//   }, [isDragging]);

//   return (
//     <div className="w-full min-w-[375px] flex flex-col items-center justify-between bg-white mt-1">
//       <div className="w-[80%] mt-1 h-10 flex justify-between items-center bg-white">
//         <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2 w-42" />
//         <img src="24hr.svg" alt="24 hour" className="mr-2 w-42" />
//       </div>

//       <div className="w-full h-[85vh] flex justify-center items-center bg-[url('/ipad.svg')] bg-contain bg-no-repeat bg-center relative">
//         <div className="w-[80%] h-[90%] flex justify-center items-center absolute" ref={sliderRef}>
//           <div className="w-full h-full flex justify-center items-center min-w-[290px] relative">
//             {(!hasLoadedOnce || isLoading) && (
//               <LoadingOverlay
//                 widthClass="w-full"
//                 heightClass="h-full"
//               />
//             )}
//             <div className="w-full h-full relative overflow-hidden select-none" style={{ cursor: isDragging ? "ew-resize" : "default" }}>
//               {currentAfter && <Image src={currentAfter} alt="After" fill priority />}
//               <div className="w-full h-full absolute top-0 left-0 right-0 overflow-hidden select-none" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
//                 {currentBefore && <Image src={currentBefore} alt="Before" fill priority />}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-4 left-4 flex items-center">
//           <button
//             ref={buttonRef}
//             className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
//             onClick={handleReload}
//           >
//             <img src="reload.svg" alt="Reload" className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       <div className={`w-[80%] h-2 bg-gray-200 rounded-full mt-4 relative ${styles["button-pseudo-element"]}`} style={{ "--slider-position": `${sliderPosition}%` }}>
//         <div
//           className="absolute top-0 left-0 h-full bg-purple-600 rounded-full"
//           style={{ width: `${sliderPosition}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default BeforeAfterSlider;
