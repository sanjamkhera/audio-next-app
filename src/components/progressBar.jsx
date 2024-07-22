// ProgressBar.jsx
import React from 'react';
import { useSpring, animated } from 'react-spring';

const ProgressBar = ({ progress }) => {
  const progressBarStyles = useSpring({
    width: `${progress}%`,
    from: { width: '0%' },
    config: { duration: 500 }
  });

  return (
    <div className="w-full h-2 bg-gray-300 fixed top-0 z-50">
      <animated.div
        style={progressBarStyles}
        className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
      />
    </div>
  );
};

export default ProgressBar;
