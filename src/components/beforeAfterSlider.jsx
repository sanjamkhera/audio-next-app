


// "use client"
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import CachedIcon from '@mui/icons-material/Cached';

// const BeforeAfterSlider = () => {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);
//   const sliderRef = useRef(null);

//   const beforeImages = ['/before1.svg', '/before2.svg', '/before3.svg', '/before4.svg', '/before5.svg', '/before6.svg'];
//   const afterImages = ['/after1.svg', '/after2.svg', '/after3.svg', '/after4.svg', '/after5.svg', '/after6.svg'];

//   const getRandomImage = () => Math.floor(Math.random() * 6);

//   const [currentBefore, setCurrentBefore] = useState(beforeImages[getRandomImage()]);
//   const [currentAfter, setCurrentAfter] = useState(afterImages[getRandomImage()]);

//   const handleReload = () => {
//     setCurrentBefore(beforeImages[getRandomImage()]);
//     setCurrentAfter(afterImages[getRandomImage()]);
//   };

//   useEffect(() => {
//     const slider = sliderRef.current;

//     const handleMove = (event) => {
//       if (!isDragging) return;
//       const rect = slider.getBoundingClientRect();
//       const clientX = event.type.startsWith('touch')
//         ? event.touches[0].clientX
//         : event.clientX;

//       const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
//       const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

//       setSliderPosition(percent);
//     };

//     const handleStart = (event) => {
//       setIsDragging(true);
//       // preventDefault is not used here due to passive event listener constraints
//     };

//     const handleEnd = (event) => {
//       setIsDragging(false);
//       // preventDefault is not used here due to passive event listener constraints
//     };

//     // Attach event listeners directly
//     slider.addEventListener('mousedown', handleStart);
//     slider.addEventListener('mouseup', handleEnd);
//     slider.addEventListener('mousemove', handleMove);

//     slider.addEventListener('touchstart', handleStart, { passive: false });
//     slider.addEventListener('touchend', handleEnd, { passive: false });
//     slider.addEventListener('touchmove', handleMove, { passive: false });

//     return () => {
//       slider.removeEventListener('mousedown', handleStart);
//       slider.removeEventListener('mouseup', handleEnd);
//       slider.removeEventListener('mousemove', handleMove);

//       slider.removeEventListener('touchstart', handleStart);
//       slider.removeEventListener('touchend', handleEnd);
//       slider.removeEventListener('touchmove', handleMove);
//     };
//   }, [isDragging]);

//   return (
//     <div className='w-full h-full flex flex-col items-center justify-start mt-1 bg-white'>

//       <div className="w-[90%] flex justify-between bg-white">
//         <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2" />
//         <img src="24hr.svg" alt="24 hour" className="mr-2" />
//       </div>

//       {/* Slider Parent */}
//       <div className="w-full h-full flex flex-col items-center justify-start bg-[url('/ipad.svg')] bg-cover bg-right" style={{ backgroundPosition: 'calc(100% + 15px) center' }}>
//         <div className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl" style={{ transform: 'rotate(-1deg)' }}>
//           <div className='w-[75%] h-[85%] min-w-[290px] bg-white-500 ml-14 mt-8 rounded-xl' ref={sliderRef} style={{ transform: 'rotate(1deg)' }}>
//             {/* Wrapper around the images */}
//             <div className="w-full h-full relative overflow-hidden select-none" style={{ cursor: isDragging ? 'ew-resize' : 'default' }}>
//               <Image src={currentAfter} alt="After" fill priority />
//               <div className='w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none' style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
//                 <Image src={currentBefore} alt="Before" fill priority />
//               </div>
//             </div>
//             <div className='absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize' style={{ left: `calc(${sliderPosition}% - 1px)` }}>
//               <div className='bg-white absolute rounded-full w-3 h-3 -left-1 top-[calc(50%-5px)]'></div>
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-end  w-full bg-[#efefef] my-auto" style={{ transform: 'rotate(1deg)' }}>
//             <div className="flex w-[20%] items-center justify-start pl-5" style={{ transform: 'rotate(1deg)' }}>
//               <CachedIcon color="disabled" fontSize="large" alt="Reload" className="cursor-pointer" onClick={handleReload} />
//             </div>

//             <div className="w-[60%] flex items-center justify-center rounded-full mt-2  mr-5 border-zinc-500 bg-gradient-to-b from-gray-300 to-white transform rotate-1">
//               <img src="slider.svg" alt="Slider" className="cursor-pointer -mt-3 -mb-3" />
//             </div>
//           </div>
//         </div>

//       </div>


//     </div>
//   );
// };

// export default BeforeAfterSlider;

"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CachedIcon from '@mui/icons-material/Cached';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const sliderHandleRef = useRef(null);

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
    const handle = sliderHandleRef.current;

    const handleMove = (event) => {
      if (!isDragging) return;
      const rect = slider.getBoundingClientRect();
      const clientX = event.type.startsWith('touch')
        ? event.touches[0].clientX
        : event.clientX;

      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

      setSliderPosition(percent);
    };

    const handleStart = (event) => {
      setIsDragging(true);
    };

    const handleEnd = (event) => {
      setIsDragging(false);
    };

    handle.addEventListener('mousedown', handleStart);
    handle.addEventListener('mouseup', handleEnd);
    handle.addEventListener('mousemove', handleMove);

    handle.addEventListener('touchstart', handleStart, { passive: false });
    handle.addEventListener('touchend', handleEnd, { passive: false });
    handle.addEventListener('touchmove', handleMove, { passive: false });

    return () => {
      handle.removeEventListener('mousedown', handleStart);
      handle.removeEventListener('mouseup', handleEnd);
      handle.removeEventListener('mousemove', handleMove);

      handle.removeEventListener('touchstart', handleStart);
      handle.removeEventListener('touchend', handleEnd);
      handle.removeEventListener('touchmove', handleMove);
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
        <div className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl" style={{ transform: 'rotate(-1deg)' }}>
          <div className='w-[75%] h-[85%] min-w-[290px] bg-white-500 ml-14 mt-8 rounded-xl' ref={sliderRef} style={{ transform: 'rotate(1deg)' }}>
            {/* Wrapper around the images */}
            <div className="w-full h-full relative overflow-hidden select-none" style={{ cursor: isDragging ? 'ew-resize' : 'default' }}>
              <Image src={currentAfter} alt="After" fill priority />
              <div className='w-full h-full absolute top-0 left-0 right-0 max-w-[700px] overflow-hidden select-none' style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <Image src={currentBefore} alt="Before" fill priority />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-full bg-[#efefef] my-auto" style={{ transform: 'rotate(1deg)' }}>
            <div className="flex w-[20%] items-center justify-start pl-5" style={{ transform: 'rotate(1deg)' }}>
              <CachedIcon color="disabled" fontSize="large" alt="Reload" className="cursor-pointer" onClick={handleReload} />
            </div>

            <div className="w-[60%] flex items-center justify-center rounded-full mt-2 mr-5 border-zinc-500 bg-gradient-to-b from-gray-300 to-white transform rotate-1 cursor-ew-resize" ref={sliderHandleRef} style={{ left: `calc(${sliderPosition}% - 1px)` }}>
              <img src="slider.svg" alt="Slider" className="cursor-pointer -mt-3 -mb-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
