import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const ProjectTracker = () => {
  const [isTracking, setIsTracking] = useState(false);

  const slideDown = useSpring({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(80%)' },
    config: { duration: 500 } // Adjust duration as needed, 1000ms = 1 second
  });

  return (
    <>
      <button
        className="flex flex-row justify-center items-center px-3 py-[10px] gap-2 flex-none bg-white text-black rounded-lg ring-2 ring-customGray mr-4 ring-inset"
        onClick={() => setIsTracking(true)}
      >
        <img src="projectHistory.svg" alt="Project History" />
        <span className="text-sm font-bold text-[#1D252F]">Track Project</span>
        <img src="dropDown.svg" alt="Dropdown" />
      </button>
      {isTracking && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 max-w-[430px] min-w-[315px]" onClick={() => setIsTracking(false)}></div>

          {/* Sliding window */}
          <animated.div style={slideDown} className="fixed inset-0 bg-white z-50 flex flex-col rounded-t-xl items-center p-4 max-w-[430px] min-w-[315px]">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Track Project</h2>
              <button onClick={() => setIsTracking(false)} className="text-2xl font-bold"><img src="closeButton.svg" alt="Close" /></button>
            </div>
            <input type="text" placeholder="Enter Client ID" className="w-[85%] flex items-center justify-center border mb-4 h-[40px] p-3 focus:outline-none placeholder-placeHolderGray-700 text-center rounded-lg" />
            <button className="w-[85%] flex items-center justify-center font-semibold bg-black h-[40px] text-white p-4 rounded-lg">Check Status</button>
          </animated.div>
        </>
      )}
    </>
  );
};

export default ProjectTracker;
